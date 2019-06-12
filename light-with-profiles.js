import {
  LitElement,
  html,
  css
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

class LightWithProfiles extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {}
    };
  }

  constructor() {
    super();

    this.lightProfiles = {
      // Add your profiles here to show what profile is active
      // bright: '0.457,0.408,254',
      // dimmed: '0.457,0.408,77',
      // nightlight: '0.509,0.411,1'
    };
  }

  render() {
    return html`
      <ha-card>
        ${this.config.title ? html`
          <div class="card-header">
            <div class="name">${this.config.title}</div>
            </div>
        ` : ''}
        <div class="card-content entities">
          ${this.config.entities.map(ent => {
            const stateObj = this.hass.states[ent.entity];
            return stateObj
              ? html`
                  <span class="label">${stateObj.attributes.friendly_name}</span>
                  <div class="profiles">
                    ${ent.profiles ? ent.profiles.map(profile => {
                      return html`
                        <ha-icon class="profile-icon"
                          ?active="${this.profileClass(stateObj, profile.name)}"
                          .icon="${profile.icon}"
                          .title="${profile.name}"
                          @click="${() => this.turnOnProfile(ent.entity, profile.name)}"
                        ></ha-icon>
                      `;
                    }) : ''}
                  </div>
                  <paper-toggle-button
                    ?checked="${stateObj.state === 'on'}"
                    @click="${() => this.toggleLight(ent.entity)}"
                  ></paper-toggle-button>
                `
              : 'Entity not found!';
          })}
        </div>
      </ha-card>
    `;
  }

  toggleLight(entity) {
    this.hass.callService("homeassistant", "toggle", {
      entity_id: entity
    });
  }

  turnOnProfile(entity, pro) {
    this.hass.callService('light', 'turn_on', {
      'entity_id': entity,
      'profile': pro
    });
  }

  profileClass(stateObj, profile) {
    if (stateObj.attributes.xy_color && stateObj.attributes.brightness) {
      const activeProfile = `${stateObj.attributes.xy_color.toString()},${stateObj.attributes.brightness.toString()}`;

      if (activeProfile === this.lightProfiles[profile]) {
        return true;
      }
    }

    return false;
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error("You need to define entities");
    }
    this.config = config;
  }

  getCardSize() {
    return this.config.entities.length + 1;
  }

  static get styles() {
    return css`
      .entities {
        display: grid;
        grid-template-columns: auto auto 46px;
        gap: 16px 10px;
        margin-top: 8px;
      }

      .label {
        font-size: 1.2rem;
        font-weight: 500;
      }

      .profiles {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-content: stretch;
        align-items: flex-start;
      }

      .profile-icon {
        cursor: pointer;
        fill: var(--disabled-text-color);
      }

      .profile-icon[active] {
        fill: var(--primary-color);
      }

      paper-toggle-button {
        cursor: pointer;
      }
    `;
  }
}

customElements.define('light-with-profiles', LightWithProfiles);
