yo this is Souvikarjun Deb

welcome to my personal portfolio.

## Contact form

The contact form sends messages through EmailJS. Copy `.env.example` to `.env.local` and set the service ID, template ID, and public key from your EmailJS account.

Configure the EmailJS template to send to your inbox and use `{{name}}`, `{{email}}`, and `{{message}}` for the submitted fields. The sender address is also provided as `{{reply_to}}` so you can reply directly to the person who submitted the form. Restart the development server after changing environment variables.
