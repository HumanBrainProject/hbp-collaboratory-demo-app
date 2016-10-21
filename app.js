/*global $, document, window, BbpOidcClient*/
(function() {
  'use strict';

  var init = function() {
    $(document).ready(function() {
      $('*[hbp-login]')
      .on('click', authenticate);
    });

    hello.init({
      hbp: 'bfac2ac5-ae3e-4718-ac10-0e0a857b027e' // Replace with your app id
    });

  };

  // authenticate() function configures the BbpOidcClient and
  // retrieves the current user token.
  //
  // If the user is not authenticated, it will redirect to the HBP auth server
  // and use an OpenID connect implicit flow to retrieve an user access token.
  var authenticate = function() {
    // Setup OpenID connect authentication using the clientId provided
    // in the HBP OIDC client page.
    // https://collab.humanbrainproject.eu/#/collab/54/nav/1051
    // Retrieve the user token
    hello.login('hbp');
    // after login, retrieve data using the obtained token
    hello.on('auth.login', retrieveCurrentContext);
  };

  // Extract the context UUID from the querystring.
  var extractCtx = function() {
    return window.location.search.substr(
      window.location.search.indexOf('ctx=') + 4,
      36 // UUID is 36 chars long.
    );
  };

  var retrieveCurrentContext = function(event) {
    var ctx = extractCtx();
    var token = event.authResponse.access_token;

    // Query the collaboratory service to retrieve the current context
    // related collab and other associated informations.
    $.ajax('https://services.humanbrainproject.eu/collab/v0/collab/context/' + ctx + '/', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .done(function(data) {
      // Update the DOM with the context object retrieved by the web service.
      $('.collab-title').html(data.collab.title);
      $('.collab-content').html(data.collab.content);
      $('.data-source').html(JSON.stringify(data, null, 2)).show();
    })
    .fail(function(err) {
      $('.data-source').html(JSON.stringify(err, null, 2)).show();
    });

    // Query User service to load the logged in user profile
    $.ajax('https://services.humanbrainproject.eu/oidc/userinfo', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .done(function(data) {
      // Update the DOM with the context object retrieved by the web service.
      $('.user-displayname').html(data.family_name + ' ' + data.given_name);
      $('.user-email').html(data.email);
      $('#hbp-data').show();
    });
  };

  init();
}());
