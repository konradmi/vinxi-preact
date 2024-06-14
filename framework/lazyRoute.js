import { Fragment, createElement } from "preact";
import { lazy, forwardRef, useLayoutEffect } from 'preact/compat';
import { cleanupStyles, preloadStyles, updateStyles } from "vinxi/css";

export function renderAsset({
	tag,
	attrs: { key, ...attrs } = {
		key: undefined,
	},
	children,
}) {
	switch (tag) {
		case "script":
			if (attrs.src) {
				return createElement("script", { ...attrs, key: attrs.src });
			} else {
				return createElement("script", {
					...attrs,
					key: key,
					dangerouslySetInnerHTML: {
						__html: children,
					},
				});
			}
		case "link":
			return createElement("link", { ...attrs, key: key });
		case "style":
			return createElement("style", {
				...attrs,
				key: key,
				dangerouslySetInnerHTML: { __html: children },
			});
	}
}

export default function lazyRoute(
	component,
	clientManifest,
	serverManifest,
	exported = "default",
) {
	return lazy(async () => {
		if (import.meta.env.DEV) {
			let manifest = import.meta.env.SSR ? serverManifest : clientManifest;
			const mod = await manifest.inputs[component.src].import();
			// invariant(
			// 	mod[exported],
			// 	`Module ${component.src} does not export ${exported}`,
			// );

			const Component = mod[exported];
			let assets = await clientManifest.inputs?.[component.src].assets();
			const styles = assets.filter((asset) => asset.tag === "style");

			if (typeof window !== "undefined" && import.meta.hot) {
				import.meta.hot.on("css-update", (data) => {
					updateStyles(styles, data);
				});
			}

			const Comp = forwardRef((props, ref) => {
				if (typeof window !== "undefined") { 
					useLayoutEffect(() => {
						return () => {
							// remove style tags added by vite when a CSS file is imported
							cleanupStyles(styles);
						};
					}, []);
				}

				return createElement(
					Fragment,
					null,
					...assets.map((asset) => renderAsset(asset)),
					createElement(Component, { ...props, ref: ref }),
				);
			});
			return { default: Comp };
		} else {
			const mod = await component.import();

			const Component = mod[exported];
			let assets = await clientManifest.inputs?.[component.src].assets();

			if (typeof window !== "undefined") {
				const styles = assets.filter(
					(asset) => asset.attrs.rel === "stylesheet",
				);
				preloadStyles(styles);
			}

			const Comp = forwardRef((props, ref) => {
				return createElement(
					Fragment,
					null,
					...assets.map((asset) => renderAsset(asset)),
					createElement(Component, { ...props, ref: ref }),
				);
			});
			return { default: Comp };
		}
	});
}
