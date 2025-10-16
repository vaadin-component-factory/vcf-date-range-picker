export function cssImportPlugin() {
    return {
        name: 'css-import',
        transformImport({ source }) {
            if (source.endsWith('.css')) {
                return `${source}?injectCSS`;
            }
        },
        transform(context) {
            if (context.query.injectCSS !== undefined) {
                return `
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = ${JSON.stringify(context.path)};
          document.head.appendChild(link);
          await new Promise((resolve, reject) => {
            link.addEventListener('load', resolve);
            link.addEventListener('error', reject);
          });
        `;
            }
        },
        resolveMimeType(context) {
            if (context.query.injectCSS !== undefined) {
                return 'text/javascript';
            }
        },
    };
}


export default {
    plugins: [
        cssImportPlugin(),
    ],
};
