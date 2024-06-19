import { BaseFileSystemRouter, cleanPath } from "vinxi/fs-router";
import { posix } from "path";
import fg from "fast-glob";

export class MyFileSystemRouter extends BaseFileSystemRouter {
  toPath(src: string) {
    const routePath = cleanPath(src, this.config)
      // remove the initial slash
      .slice(1)
      .replace(/index$/, "")
      .toLowerCase()

    const trimmedPath = routePath.endsWith("/") ? routePath.slice(0, -1) : routePath;
    
    return trimmedPath?.length > 0 ? `/${trimmedPath}` : "/";
  }

  toRoute(filePath: string) {
    return {
      path: this.toPath(filePath),
      $component: {
        src: filePath,
        pick: ["default", "$css"],
      },
    };
  }

  glob() {
		return (
			posix.join(fg.convertPathToPattern(this.config.dir), "**/*index*") +
			`.{${this.config.extensions.join(",")}}`
		);
	}
}
