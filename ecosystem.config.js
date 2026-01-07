module.exports = {
  apps: [
    {
      name: "Aavin-PG-Handler",
      script: ".next/standalone/server.js",
      cwd: "/home/ec2-user/var/www/uat/AavinPGHandlerWebApp",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production",
        PORT: 3003
      }
    }
  ]
};
