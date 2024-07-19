import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '@polymer/iron-media-query/iron-media-query.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { ControlStateMixin } from '@vaadin/vaadin-control-state-mixin/vaadin-control-state-mixin.js';
import './vcf-date-range-picker-overlay.js';

import { DateRangePickerMixin } from './vcf-date-range-picker-mixin.js';
import './vcf-date-range-picker-text-field.js';
import { ElementMixin } from '@vaadin/component-base/src/element-mixin.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

/**
 *
 * `<vcf-date-range-picker>` is a date selection field which includes a scrollable
 * month calendar view.
 * ```html
 * <vcf-date-range-picker label="Birthday"></vcf-date-range-picker>
 * ```
 * ```js
 * datePicker.value = '2016-03-02';
 * ```
 * When the selected `value` is changed, a `value-changed` event is triggered.
 *
 *
 * ### Styling
 *
 * The following shadow DOM parts are available for styling:
 *
 * Part name | Description | Theme for Element
 * ----------------|----------------|----------------
 * `text-field` | Input element | vcf-date-range-picker
 * `clear-button` | Clear button | vcf-date-range-picker
 * `toggle-button` | Toggle button | vcf-date-range-picker
 * `overlay-content` | The overlay element | vcf-date-range-picker
 * `overlay-header` | Fullscreen mode header | vcf-date-range-picker-overlay-content
 * `label` | Fullscreen mode value/label | vcf-date-range-picker-overlay-content
 * `clear-button` | Fullscreen mode clear button | vcf-date-range-picker-overlay-content
 * `toggle-button` | Fullscreen mode toggle button | vcf-date-range-picker-overlay-content
 * `years-toggle-button` | Fullscreen mode years scroller toggle | vcf-date-range-picker-overlay-content
 * `months` | Months scroller | vcf-date-range-picker-overlay-content
 * `years` | Years scroller | vcf-date-range-picker-overlay-content
 * `toolbar` | Footer bar with buttons | vcf-date-range-picker-overlay-content
 * `today-button` | Today button | vcf-date-range-picker-overlay-content
 * `cancel-button` | Cancel button | vcf-date-range-picker-overlay-content
 * `month` | Month calendar | vcf-date-range-picker-overlay-content
 * `year-number` | Year number | vcf-date-range-picker-overlay-content
 * `year-separator` | Year separator | vcf-date-range-picker-overlay-content
 * `month-header` | Month title | vcf-date-range-month-calendar
 * `weekdays` | Weekday container | vcf-date-range-month-calendar
 * `weekday` | Weekday element | vcf-date-range-month-calendar
 * `week-numbers` | Week numbers container | vcf-date-range-month-calendar
 * `week-number` | Week number element | vcf-date-range-month-calendar
 * `date` | Date element | vcf-date-range-month-calendar
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * The following state attributes are available for styling:
 *
 * Attribute    | Description | Part name
 * -------------|-------------|------------
 * `invalid` | Set when the element is invalid | :host
 * `opened` | Set when the date selector overlay is opened | :host
 * `readonly` | Set when the element is readonly | :host
 * `disabled` | Set when the element is disabled | :host
 * `today` | Set on the date corresponding to the current day | date
 * `focused` | Set on the focused date | date
 * `disabled` | Set on the date out of the allowed range | date
 * `selected` | Set on the selected date | date
 *
 * If you want to replace the default input field with a custom implementation, you should use the
 * [`<vcf-date-range-picker-light>`](#vcf-date-range-picker-light) element.
 *
 * In addition to `<vcf-date-range-picker>` itself, the following internal
 * components are themable:
 *
 * - `<vaadin-text-field>`
 * - `<vcf-date-range-picker-overlay>`
 * - `<vcf-date-range-picker-overlay-content>`
 * - `<vcf-date-range-month-calendar>`
 *
 * Note: the `theme` attribute value set on `<vcf-date-range-picker>` is
 * propagated to the internal themable components listed above.
 *
 * @memberof Vaadin
 * @mixes Vaadin.ElementMixin
 * @mixes Vaadin.ControlStateMixin
 * @mixes Vaadin.ThemableMixin
 * @mixes Vaadin.DateRangePickerMixin
 * @mixes Polymer.GestureEventListeners
 * @demo demo/index.html
 */
  class DateRangePickerElement extends
  ElementMixin(
    ControlStateMixin(
      ThemableMixin(
        DateRangePickerMixin(
          GestureEventListeners(PolymerElement))))) {
  static get template() {
    return html`
    <style>
      :host {
        display: inline-flex;
        white-space: nowrap;
      }

      :host([hidden]) {
        display: none !important;
      }

      :host([opened]) {
        pointer-events: auto;
      }

      [part="start-text-field"] {
        align-self: baseline;
        flex-grow: 1;
        width: 11ch;
      }
      [part="end-text-field"] {
        align-self: baseline;
        flex-grow: 1;
        width: 16ch;
        overflow: hidden;
      }
      [focus-ring][part="end-text-field"] {
        padding-left: 2px;
        padding-right: 2px;
      }
      [focus-ring][part="end-text-field"] [part="toggle-button"] {
        margin-right: -2px;
      }
      [part="dash"][hidden] {
        display: none;
      }
      [part="drp-container"] {
        display:flex; 
        min-width:100%; 
        max-width:100%; 
      }
      [part="end-text-field"] [part="toggle-button"] {
        position: absolute;
        right: 6px;
      }
      [part="end-text-field"]::part(clear-button) {
        margin-right: 24px;
      }
    </style>

    <div part="drp-container">
      <vcf-date-range-picker-text-field id="startInput"
          role="application"
          autocomplete="off"
          on-focus="_focusStart"
          value="{{_userInputStartValue}}"
          invalid="[[invalid]]"
          label="[[label]]"
          name="[[name]]"
          placeholder="[[placeholder]]"
          required="[[required]]"
          disabled="[[disabled]]"
          readonly="[[readonly]]"
          error-message="[[errorMessage]]"
          aria-label$="[[label]]"
          part="start-text-field"
          helper-text="[[helperText]]"
          theme$="[[theme]]"
          class="startDate"
          autoselect="true"
          hidden="[[hideTextFields]]"
        >
        <slot name="prefix" slot="prefix"></slot>        
        <div part="helper-text" slot="helper" name="helper-text">[[helperText]]</div>
      </vcf-date-range-picker-text-field
      ><vcf-date-range-picker-text-field 
          disabled="[[disabled]]" 
          class="dash" 
          value="—" 
          invalid="[[invalid]]"
          readonly="[[readonly]]"
          hidden="[[hideTextFields]]" 
          part="dash"></vcf-date-range-picker-text-field
      ><vcf-date-range-picker-text-field id="endInput"
          role="application"
          autocomplete="off"
          on-focus="_focusEnd"
          on-change="_clearStartTextField"
          value="{{_userInputEndValue}}"
          invalid="[[invalid]]"
          name="[[name]]"
          placeholder="[[endPlaceholder]]"
          required="[[required]]"
          disabled="[[disabled]]"
          readonly="[[readonly]]"
          clear-button-visible$="[[clearButtonVisible]]"
          part="end-text-field"
          helper-end-text="[[helperEndText]]"
          theme$="[[theme]]"
          class="endDate"
          autoselect="true"
          hidden="[[hideTextFields]]"
        >
        <slot name="prefix" slot="prefix"></slot>
        <div part="helper-end-text" slot="helper" name="helper-end-text">[[helperEndText]]</div>
        <div part="toggle-button" slot="suffix" on-tap="_toggle" role="button" aria-label$="[[i18n.calendar]]" aria-expanded$="[[_getAriaExpanded(opened)]]"></div>
      </vcf-date-range-picker-text-field>
    </div>
    <vcf-date-range-picker-overlay
        id="overlay"
        fullscreen$="[[_fullscreen]]"
        opened="{{opened}}"
        theme$="[[__getOverlayTheme(theme, _overlayInitialized)]]"
        on-vaadin-overlay-open="_onOverlayOpened"
        on-vaadin-overlay-close="_onOverlayClosed"
        disable-upgrade>
      
    </vcf-date-range-picker-overlay>
    <div style="display:none">
      <slot name="presets"></slot>
    </div>
      
    <iron-media-query
        query="[[_fullscreenMediaQuery]]"
        query-matches="{{_fullscreen}}">
    </iron-media-query>
    `;
  }
  static get is() {
    return 'vcf-date-range-picker';
  }

  static get version() {
    return '5.0.1';
  }

  static get properties() {
    return {
      /**
       * Set to true to display the clear icon which clears the input.
       * @attr {boolean} clear-button-visible
       * @type {boolean}
       */
      clearButtonVisible: {
        type: Boolean,
        value: false
      },

      /**
       * Set to true to disable this element.
       * @type {boolean}
       */
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * The error message to display when the start input is invalid.
       * @attr {string} error-message
       */
      errorMessage: String,

      /**
       * A placeholder string in addition to the label. If this is set, the label will always float.
       */
      placeholder: String,

      /**
       * A placeholder string in addition to the label. If this is set, the label will always float.
       */
        endPlaceholder: String,

      /**
       * String used for the helper text.
       * @attr {string} helper-text
       */
      helperText: String,

      /**
       * String used for the helper end text.
       * @attr {string} helper-text
       */
        helperEndText: String,

      /**
       * Set to true to make this element read-only.
       * @type {boolean}
       */
      readonly: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      hideSidePanel: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      hideTextFields: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },

      /**
       * This property is set to true when the control value invalid.
       * @type {boolean}
       */
      invalid: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        value: false
      },

      _classNamesForDates: {
        type: Object,
        value: {},
        notify: true
      },

      /** @private */
      _userInputStartValue: String,
      _userInputEndValue: String
    };
  }

  static get observers() {
    return [
      '_userInputStartValueChanged(_userInputStartValue)',
      '_userInputEndValueChanged(_userInputEndValue)',
      '_setClearButtonLabel(i18n.clear)'
    ];
  }

  /** @protected */
  ready() {
    super.ready();

    // In order to have synchronized invalid property, we need to use the same validate logic.
    afterNextRender(this, () => this._inputStartElement.validate = () => {});
    afterNextRender(this, () => this._inputEndElement.validate = () => {});

    this._inputStartElement.addEventListener('change', (e) => {
      // For change event on text-field blur, after the field is cleared,
      // we schedule change event to be dispatched on date-range-picker blur.
      if (this._inputStartElement.value === '' && !e.__fromClearButton) {
        this.__dispatchChange = true;
      }
    });
    this._inputEndElement.addEventListener('change', (e) => {
      // For change event on text-field blur, after the field is cleared,
      // we schedule change event to be dispatched on date-range-picker blur.
      if (this._inputEndElement.value === '' && !e.__fromClearButton) {
        this.__dispatchChange = true;
      }
    });

    const wc = this;
    const resizeObserver = new ResizeObserver(entries => {
      requestAnimationFrame(() => {
        for (let entry of entries) {
          if(entry.contentBoxSize) {
            var size = wc.shadowRoot.host.offsetWidth;
            wc._inputStartElement.shadowRoot.querySelector('[part="label"]')
              .setAttribute('style', "width: " + size + "px; max-width: max-content; overflow: hidden;");
            wc._inputStartElement.shadowRoot.querySelector('[part="error-message"]')
              .setAttribute('style', "width: " + size + "px; max-width: max-content; overflow: hidden;");
          }
        }
      });
    });
    
    resizeObserver.observe(this);
  }

  setClassNameForDates(className, dates) {
    var newJson = JSON.parse(JSON.stringify(this._classNamesForDates));
    newJson[className] = dates;
    this._classNamesForDates = newJson;
  }

  // Workaround https://github.com/vaadin/web-components/issues/2855
  /** @protected */
  _openedChanged(opened) {
    super._openedChanged(opened);

    this.$.overlay.positionTarget = this.shadowRoot.querySelector('[part="input-field"]');
    this.$.overlay.noVerticalOverlap = true;
  }

  /** @private */
  _onVaadinOverlayClose(e) {
    if (this._openedWithFocusRing && this.hasAttribute('focused')) {
      this.focusElement.setAttribute('focus-ring', '');
    } else if (!this.hasAttribute('focused')) {
      this.focusElement.blur();
    }
    if (e.detail.sourceEvent && e.detail.sourceEvent.composedPath().indexOf(this) !== -1) {
      e.preventDefault();
    }

    if (this._cancelled) {
      this._cancelled = false;
	  const startDate = this._parseDate(this._extractStartDate(this.value));
      const endDate = this._parseDate(this._extractEndDate(this.value));
      this._selectedStartDate = startDate;
      this._selectedEndDate = endDate;
    } else if (this._selectedStartDate && this._selectedEndDate) {
      if (this._selectedStartDate >= this._selectedEndDate) {
        this._selectedEndDate = null;
      }
      this.value = this._formatISO(this._selectedStartDate)+";"+this._formatISO(this._selectedEndDate);
    }
  }

  /** @private */
  _toggle(e) {
    e.stopPropagation();
    this[(this._overlayInitialized && this.$.overlay.opened) ? 'close' : 'open']();
  }

  /**
   * @return {HTMLElement}
   * @protected
   */
    _inputStart() {
    return this.$.startInput;
  }

  /**
   * @return {HTMLElement}
   * @protected
   */
    _inputEnd() {
    return this.$.endInput;
  }

  set _inputStartValue(value) {
    this._inputStartElement.value = value;
  }

  /** @return {string} */
  get _inputStartValue() {
    return this._inputStartElement.value;
  }

  set _inputEndValue(value) {
    this._inputEndElement.value = value;
  }

  /** @return {string} */
  get _inputEndValue() {
    return this._inputEndElement.value;
  }

  /** @private */
  _getAriaExpanded(opened) {
    return Boolean(opened).toString();
  }

  /**
   * Focusable element used by vaadin-control-state-mixin
   * @return {!HTMLElement}
   * @protected
   */
  get focusElement() {
    return this.shadowRoot.activeElement || this._inputStart() || this;
  }

  /** @private */
  _setClearButtonLabel(i18nClear) {
    // FIXME(platosha): expose i18n API in <vaadin-text-field>
    // https://github.com/vaadin/vaadin-text-field/issues/348
    this._inputStartElement.shadowRoot.querySelector('[part="clear-button"]')
      .setAttribute('aria-label', i18nClear);
  }
}

customElements.define(DateRangePickerElement.is, DateRangePickerElement);

/**
 * @namespace Vaadin
 */
window.Vaadin.DateRangePickerElement = DateRangePickerElement;
