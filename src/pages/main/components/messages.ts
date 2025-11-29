export default `
<div class="{{class.messages}}">
{{>
MessagesHeader
    class=(lookup @root.styles)
    profileBtnDataset=(lookup @root.profileBtnDataset)
    profileLink=(lookup @root.profileLink)
}}
<main class="{{class.main}}">
{{#if messages}}
{{>
DatePlate
    date="15 мая"
}}
{{#each messages}}
{{>
Message
    dataset=(lookup @root.messageDataset)
    isMe=(isMe this.last_message.user.id (lookup @root.state.user.id))
    author=this.last_message.user.first_name
    text=this.last_message.content
    date=this.last_message.time
    class=(lookup @root.styles)
}}
{{/each}}
{{else}}
Сообщений пока нет...
{{/if}}
</main>
{{>
MessagesFooter
    class=(lookup @root.styles)
    submit=(lookup @root.submit)
    message=(lookup @root.state.message)
    formId=(lookup @root.submit.formId)
}}
</div>
`;
