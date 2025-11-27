export default `
<div class="drop-down-option" id="{{id}}" data-option="{{dataset}}">
<div class="drop-down-option-icon">
{{> (getPartialComponent iconPartialName iconPartialType) iconPartialName }}
</div>
<div class="drop-down-option-text">{{text}}</div>
</div>
`;
