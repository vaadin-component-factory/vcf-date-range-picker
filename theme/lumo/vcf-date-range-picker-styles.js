import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import '@vaadin/vaadin-lumo-styles/font-icons.js';
import '@vaadin/vaadin-lumo-styles/mixins/field-button.js';

registerStyles(
  'vcf-date-range-picker',
  css`
      :host {
        outline: none;
      }

      [part="dash"]::before {
        content: var(--lumo-icons-minus);
        font-family: "lumo-icons";
      }

      [part="dash"] {
        display: inline-flex;
        background-color: var(--lumo-contrast-10pct);
        padding-top: 11.5px;
        padding-bottom: 10.5px;
      }

      :host([disabled]) [part="dash"] {
        background-color: var(--lumo-contrast-5pct);
        padding-top: 11.5px;
        padding-bottom: 10.5px;
      }

      :host([readonly]) [part="dash"] {
        background-color: var(--lumo-contrast-0pct);
      }

      :host([invalid]) [part="dash"] {
        background-color: var(--lumo-error-color-10pct);
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
