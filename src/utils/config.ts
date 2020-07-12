export const config = {
  redirectUrl: 'com.devgridchallenge://oauthredirect',
  clientId: '4c6ee95e8b4718afc105',
  clientSecret: '630e57bfb37859a263ac8cb635dd70e5ffaa8cd4',
  scopes: ['identity', 'gist'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/<client-id>',
  },
};
