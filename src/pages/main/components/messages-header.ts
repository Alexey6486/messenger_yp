export default `
<header class="{{class.header}}">
<div class="{{class.user}} {{profileLink}}" data-profile-btn="{{profileBtnDataset}}">
<div class="{{class.user-icon}}">
</div>
<div class="{{class.user-name}}">{{lookup @root.state.user 'first_name'}}</div>
</div>
{{>
DropDown
    id=(lookup @root.ddTop 'id')
    dataset=(lookup @root.ddTop 'dataset')
    options=(lookup @root.ddTop 'options')
    direction=(lookup @root.ddTop 'direction')
    icon=(lookup @root.ddTop 'icon')
}}
</header>
`;
