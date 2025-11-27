export default `
<button id="{{id}}" class="button-round" data-btn="{{type}}">
{{> (getPartialComponent partialName partialType) iconPartialName }}
</button>`;
