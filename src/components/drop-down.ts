export default `
<div class="drop-down" id="{{id}}" data-dd="{{dataset}}">
<div class="drop-down-button">
{{>
ButtonRound
    id=''
    type=''
    partialName=icon.partialName
    partialType=icon.partialType
}}
</div>
<div class="drop-down-options {{direction}}">
{{#each options}}
{{>
DropDownOption
    id=this.id
    text=this.text
    iconPartialName=this.icon.partialName
    iconPartialType=this.icon.partialType
    dataset=this.dataset
}}
{{/each}}
</div>
</div>
`;
