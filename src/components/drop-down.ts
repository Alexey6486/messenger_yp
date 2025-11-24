export default `
<div class="drop-down {{class}}">
<div class="drop-down-button" id="{{id}}" data-dd="{{dataset}}">{{buttonText}}</div>
<div class="drop-down-options {{#if isActive}}active{{/if}} {{direction}}">
{{#each options}}
{{>
DropDownOption
    id=this.id
    text=this.text
}}
{{/each}}
</div>
</div>
`;
