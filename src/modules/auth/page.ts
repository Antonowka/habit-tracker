export function authorizationButtonsChangeForm() {
  const fragment = new DocumentFragment();
  const buttons = document.createElement('div');
  buttons.classList.add('authorizationButtonsChangeConteiner');
  buttons.innerHTML = `
<div class="wrapperButtonChange">
<button class="registration buttonAuth activeAuth" id="registration">Login</button> 
<button class="createButton buttonAuth" id="createButton">Create account</button> 
</div>
`;
  fragment.append(buttons);
  return fragment;
}

export function authorizationPage() {
  const fragment = new DocumentFragment();
  const auth = document.createElement('div');
  auth.classList.add('authorizationConteiner');
  auth.innerHTML = ` 
<form class="auth__form">
<label for="login" class="hideAuth login">Login</label>
<input type="text" class="hideAuth login" id="login" placeholder="Login" maxlength="16" minlength="3">
<span id="errorLogin" class= "login error"></span>
<label for="email">Email Address</label>
<input type="email" id="email" placeholder="Email">
<span id="errorEmail" class= "error"></span>
<label for="password">Password</label>
<input type="text" id="password" placeholder="Password">
<span id="errorPassword" class="error"></span>
<button class="buttonAuth" id="authentificationButton">Enter</button>
<button class="buttonAuth hideAuth" id="authorizationButton">Create account</button>
</form>
<p class ="showError" id="showError"></p>
`;
  fragment.append(auth);
  return fragment;
}

export function hidePage() {
  (document.querySelector('.authorizationButtonsChangeConteiner') as HTMLElement)?.classList.add('hideAuth');
  (document.querySelector('.authorizationConteiner') as HTMLElement)?.classList.add('hideAuth');
}
