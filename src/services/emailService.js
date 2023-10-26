import Brevo from '@getbrevo/brevo';

const defaultClient = Brevo.ApiClient.instance;

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_KEY;

const apiInstance = new Brevo.TransactionalEmailsApi();

export const send = ({ email, name }, subject, body) => {
  const sendSmtpEmail = new Brevo.SendSmtpEmail();

  sendSmtpEmail.sender = { email: 'jlg@contact.com', name: 'JLG' };
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = `<!DOCTYPE html><html><body>${body}</body></html>`;
  sendSmtpEmail.to = [{ email, name }];

  apiInstance
    .sendTransacEmail(sendSmtpEmail)
    .then((data) => {
      console.log(
        'API called successfully. Returned data: ' + JSON.stringify(data)
      );
    })
    .catch((error) => {
      console.error(error);
    });
};
