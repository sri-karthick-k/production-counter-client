const config = {
    server: {
      port: 4001,
      hostname: 'http://192.46.211.177'
    },
    apiKeys: {
      login: '/api/login',
      authenticate: '/api/authenticate',
      addTenantUser: '/api/add-tenant-user',
      addDevice: '/api/add-device',
      getDevices: '/api/get-devices',
      getMax: '/api/device-max',
      getSensorValue: '/api/get-sensor-value',
      getCurrentDaySensorValue: '/api/current-day-sensor-value',
      getDevReport: '/api/device-report',
      deviceName:'/api/device-name',
      deviceManager: '/api/device-manager',
      getUserOfSupervisor: '/api/get-user',
      deleteDevice: '/api/device'
    }
  };


module.exports = config;
