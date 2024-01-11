import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class HelloWorld extends LitElement {
  
  static properties = {
    who: {type: String}
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Hello World',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        who: {
          type: 'string',
          title: 'Who',
          description: 'Who to say hello to'
        },
        encoded_token: {
          type: 'string',
          title: 'encoded token',
          description: 'encoded token for authorization'
        }
      }
    };
  }
  
  async load() {
    console.log('pre-load');
    const apiUserBody = {
        grant_type: "client_credentials"
    };
    const response = await fetch("https://api.swoogo.com/api/v1/oauth2/token.json", {
      method: 'POST',
      headers: {
        'Authorization': this.encoded_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(apiUserBody)
    });

    console.log('Getting token');
    const jsonResponse = await response.json();
    const access_token = jsonResponse.result.access_token;
    console.log('New Token: ' + access_token);
  }


  constructor() {
    super();
    this.load();
    this.who = 'World';
  }

  render() {
    return html`<p>Hello ${this.who}<p/>`;
  }
}

// registering the web component
const elementName = 'hello-world';
customElements.define(elementName, HelloWorld);