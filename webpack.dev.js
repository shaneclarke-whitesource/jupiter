const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


const cookie = "_ga=GA1.2.1723060556.1575843608; _gid=GA1.2.1952113615.1575843608; visid_incap_784204=UEPCn7rdTFm6WMgNp37SdkyC7V0AAAAAQUIPAAAAAADhEXKpp0glQ/UF5F1R+S2I; nlbi_784204=9p9uQseFgxI/bXa7tgYHMAAAAABIAsbmagb/U48740TnWmK1; incap_ses_113_784204=tiDQWBjITTh7FCu0z3WRAUyC7V0AAAAAw/ngnJpOoFK2W6d4ystr+Q==; bc6aca893070ffe19c61119686fa2258=3539d87b891ffda7ced9b4488284b93e; __Secure-portal_sessionid=d869399b-8668-4916-86ac-561df00c409d";
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        allowedHosts: [
            'portal.rackspace.local',
        ],
        contentBase: path.join(__dirname, './build/'),
        port: 3000,
        historyApiFallback: true,
        https: true,
        proxy: {
            '/api/*': {
                target: 'https://staging.portal.rackspace.com/',
                changeOrigin: true,
                secure: true,
                onProxyReq: (proxyReq)  => {
                    proxyReq.setHeader("Cookie", cookie);
                    console.log(proxyReq);
                },
                cookieDomainRewrite: ""
            }
        }
    },
});
