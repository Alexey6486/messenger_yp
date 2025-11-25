export default `
<div class="drop-down-option" id="{{id}}" data-option="{{dataset}}">
<div class="drop-down-option-icon">
{{> (getIconComponentPartial icon) icon }}
</div>
<div class="drop-down-option-text">{{text}}</div>
</div>
`;
