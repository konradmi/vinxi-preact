import preact from 'preact'

const Document = (props: {
  children: preact.ComponentChildren,
  manifest: object,
  routes: object,
  assets: preact.ComponentChildren[]
}) => {
  return (
    <html>
      <head>
        {props.assets}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Vinxi Preact</title>
        <script dangerouslySetInnerHTML={{
          __html: `window.manifest = ${JSON.stringify(props.manifest)};`
        }}></script>
      </head>
      <body>
        <div id="app">{props.children}</div>
      </body>
    </html>
  )
}

export default Document
