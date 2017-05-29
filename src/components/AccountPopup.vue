<template>
  <div ng-controller="LoginController as login" ng-if="reg.page == 1">
     <h1>Welcome to Racepass!</h1>
     <div class="login-panel">
       <div style="flex: 1;">
          <div ng-if="login.isCreation">Create account with social:</div>
          <div ng-if="!login.isCreation">Login with social:</div>
          <div style="margin-top: 30px;">
             <div id="fb-login" ng-click="login.facebook(reg.next, reg)">
              <i class="fa fa-facebook" aria-hidden="true"></i>
              CONTINUE WITH FACEBOOK
            </div>
          </div>
       </div>
       <div id="login-divider" style="flex: 0.1 50px">
          <div class="vbar"></div>
          <div style="margin: 8px 0px;">OR</div>
          <div class="vbar"></div>
       </div>
       <form class="userpass" style="flex: 1;">
          <div ng-if="login.isCreation">Create account with email and password:</div>
          <div ng-if="!login.isCreation">Login with your email and password:</div>
          <br>
          <input required ng-model="login.email" class="full" type="email" placeholder="Your email" /><br>
          <input required ng-model="login.password" class="full" type="password" placeholder="Choose a password" />
          <div>
             <button ng-if="login.isCreation" ng-click="login.pwd(reg.next)" id="login-button">Register</button>
             <button ng-if="!login.isCreation" ng-click="login.pwd(reg.next)" id="login-button">Login</button>
          </div>
        </form>
      </div>
  </div>
</template>
