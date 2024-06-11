import preact from 'preact'

const Document = (props: { children: preact.ComponentChildren }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Vinxi Preact</title>
      </head>
      <body>
        <div id="app">{props.children}</div>
      </body>
    </html>
  )
}

export default Document
