export default `
<li class="drop-down-option" id="{{id}}" data-option="{{dataset}}">
<a class="drop-down-option-link">
<div class="drop-down-option-icon">
{{> (getPartialComponent iconPartialName iconPartialType) iconPartialName }}
</div>
<div class="drop-down-option-text">{{text}}</div>
</a>
</li>
`;
