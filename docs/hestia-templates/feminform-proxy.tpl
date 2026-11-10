#=========================================================================#
# Custom Web Domain Proxy Template: feminform-proxy                       #
# Proxies all traffic to the Dockerized Next.js app (feminform_app)       #
# instead of the Apache/PHP backend. Created to protect against Hestia    #
# regenerating the domain config with the default PHP proxy template.    #
#=========================================================================#

server {
	listen      %ip%:%proxy_port%;
	server_name %domain_idn% %alias_idn%;
	error_log   /var/log/%web_system%/domains/%domain%.error.log error;
	access_log  /var/log/%web_system%/domains/%domain%.log combined;
	access_log  /var/log/%web_system%/domains/%domain%.bytes bytes;

	include %home%/%user%/conf/web/%domain%/nginx.forcessl.conf*;

	location ~ /\.(?!well-known\/|file) {
		deny all;
		return 404;
	}

	# Статика Next.js (/_next/static/<buildId>/...) отдаётся прямо с диска.
	# В static-cache/ хранятся билды минимум за 24 часа (см.
	# scripts/zero-downtime-deploy.sh), поэтому старые JS-чанки продолжают
	# быть доступны даже после того, как контейнер, который их собрал,
	# уже остановлен и удалён при следующем деплое.
	location ^~ /_next/static/ {
		alias %home%/%user%/web/%domain%/static-cache/;
		access_log off;
		add_header Cache-Control "public, max-age=31536000, immutable" always;
		try_files $uri @app;
	}

	location @app {
		proxy_pass http://feminform_app;
		proxy_http_version 1.1;
		proxy_set_header Host              $host;
		proxy_set_header X-Real-IP         $remote_addr;
		proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
		proxy_set_header X-Forwarded-Host  $host;
		proxy_read_timeout  60s;
		proxy_send_timeout  60s;
	}

	location / {
		proxy_pass http://feminform_app;
		proxy_http_version 1.1;

		proxy_set_header Host              $host;
		proxy_set_header X-Real-IP         $remote_addr;
		proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
		# Gcore CDN terminates SSL and connects to origin over HTTP
		# (Origin pull protocol = HTTP) but forwards the original scheme
		# via X-Forwarded-Proto - trust that header if present, otherwise
		# fall back to the current connection scheme.
		proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
		proxy_set_header X-Forwarded-Host  $host;

		proxy_set_header Upgrade           $http_upgrade;
		proxy_set_header Connection        "upgrade";

		proxy_read_timeout  60s;
		proxy_send_timeout  60s;
	}

	location /error/ {
		alias %home%/%user%/web/%domain%/document_errors/;
	}

	include %home%/%user%/conf/web/%domain%/nginx.conf_*;
}
