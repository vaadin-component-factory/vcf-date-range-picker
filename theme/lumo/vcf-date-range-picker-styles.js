import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import '@vaadin/vaadin-lumo-styles/font-icons.js';
import '@vaadin/vaadin-lumo-styles/mixins/field-button.js';

registerStyles(
  'vcf-date-range-picker',
  css`
      :host {
        outline: none;
      }

      [part="dash"] {
        display: inline-flex;
        align-self: baseline;
        width: 26px;
      }



      [part="toggle-button"]::before {
        content: var(--lumo-icons-calendar);
      }

      [part="clear-button"]::before {
        content: var(--lumo-icons-cross);
      }

      @media (max-width: 420px), (max-height: 420px) {
        [part="overlay-content"] {
          height: 70vh;
        }
      }
      `,
  { include: ['lumo-field-button'], moduleId: 'lumo-vcf-date-range-picker' }
);
