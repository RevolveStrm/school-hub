const source: string = `
  <div style="background-color: #f9f9f9; padding: 40px; font-family: Arial, sans-serif; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px;">
      <h2 style="color: #2c3e50; text-align: center;">Welcome to <span style="color: #3498db;">School Hub</span></h2>
      <p style="font-size: 16px;">Hi <strong>{{username}}</strong>,</p>
      <p style="font-size: 16px;">Please confirm your email address by clicking the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="{{confirmationUrl}}" style="background-color: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Confirm Email
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">If the button doesn't work, you can also copy and paste the following link into your browser:</p>
      <p style="font-size: 14px; word-break: break-all;"><a href="{{confirmationUrl}}" style="color: #3498db;">{{confirmationUrl}}</a></p>
      <hr style="margin-top: 40px; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #aaa; text-align: center;">&copy; 2025 School Hub. All rights reserved.</p>
    </div>
  </div>
`;
export default source;
