Rails.application.config.middleware.use OmniAuth::Builder do
  provider :wechat, APP_CONFIG.wechat_appid, APP_CONFIG.wechat_secret
end