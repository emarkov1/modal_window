const modal = $.modal({
  title: 'John modal',
  closable: true,
  content: `
    <h4>Modal is working</h4>
    <p>lore lorem</p>`,
  width: '400px',
  footerButtons: [
    {
      text: 'Ok',
      type: 'primary',
      handler() {
        console.log('primary btn click');
        modal.close();
      },
    },
    {
      text: 'cancel',
      type: 'danger',
      handler() {
        console.log('danger btn click');
        modal.close();
      },
    },
    {
      text: 'warn',
      type: 'warning',
      handler() {
        console.log('warning btn click');
        modal.close();
      },
    },
  ],
});
