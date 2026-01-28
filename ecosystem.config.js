module.exports = {
  apps: [
    {
      name: "Aavin-PG-Handler",
      script: "npm",
      args: "start",
      cwd: "/var/www/uat/AavinPGHandlerWebApp",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3003
      }
    }
  ]
};

