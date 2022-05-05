import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';
import '@vaadin/text-field/theme/lumo/vaadin-text-field.js';

registerStyles(
  'vcf-date-range-picker-text-field',
  css`
      :not(*):placeholder-shown, /* to prevent broken styles on IE */
      :host([dir="rtl"]) [part="value"]:placeholder-shown,
      :host([dir="rtl"]) [part="input-field"] ::slotted(input:placeholder-shown) {
        --_lumo-text-field-overflow-mask-image: none;
      }

      :host([dir="rtl"]) [part="value"],
      :host([dir="rtl"]) [part="input-field"] ::slotted(input) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
      }

      [part="label"] {
        max-width: 100%;
        overflow: visible;
      }

      [part="error-message"] {
        width: 100%;
        max-width: 100%;
        overflow: visible;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      [part="value"] {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 0.25em);
      }
      :host(.dash) {
        pointer-events: none;
      }
      :host(.dash) [part="input-field"] {
        border-radius: 0;
      }
      :host(:not([disabled]):not([invalid]):not([readonly]).dash) [part="input-field"] {
        background-color: var(--lumo-contrast-10pct);
      }

      :host(.dash) [part="input-field"]::after {
        border: none;
      }

      :host([id="startInput"]) [part="input-field"] {
        padding-right:0px;
      }
      :host([id="endInput"][focus-ring]) [part="value"] {
        margin-left:-2px;
      }
      :host([id="startInput"]) [part="value"] {
        padding-right:0px;
      }
      :host([id="endInput"]) [part="input-field"] {
        padding-left:0px;
      }
      :host([id="endInput"]) [part="value"] {
        padding-left:0px;
      }
      `,
  { moduleId: 'lumo-vcf-date-range-picker-text-field' }
);