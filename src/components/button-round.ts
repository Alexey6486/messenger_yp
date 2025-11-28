export default `
<button id="{{id}}" class="button-round" data-btn="{{dataset}}" type="{{type}}">
{{> (getPartialComponent partialName partialType) iconPartialName }}
</button>`;
