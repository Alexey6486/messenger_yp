export default `
<div class="drop-down" id="{{id}}" data-dd="{{dataset}}">
<div class="drop-down-button">
{{> (getIconComponentPartial icon) icon }}
</div>
<div class="drop-down-options {{direction}}">
{{#each options}}
{{>
DropDownOption
    id=this.id
    text=this.text
    icon=this.icon
}}
{{/each}}
</div>
</div>
`;
