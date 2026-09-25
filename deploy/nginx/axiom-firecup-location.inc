# Fire Cup public knowledge-board generator.
location = /api/learning/knowledge-scenes/generate {
    limit_req zone=axiom_firecup burst=2 nodelay;
    limit_req_status 429;

    client_max_body_size 64k;

    proxy_pass http://127.0.0.1:5010;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_connect_timeout 5s;
    proxy_send_timeout 30s;
    proxy_read_timeout 370s;
}

# Async submission returns immediately; keep the stricter quota-burning limit.
location = /api/learning/knowledge-scenes/jobs {
    limit_req zone=axiom_firecup burst=2 nodelay;
    limit_req_status 429;

    client_max_body_size 64k;

    proxy_pass http://127.0.0.1:5010;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_connect_timeout 5s;
    proxy_send_timeout 15s;
    proxy_read_timeout 15s;
}

# Status polling never invokes Coze. Give it a separate, higher read budget so
# it cannot consume the submission quota or be throttled by normal 2s polling.
location ^~ /api/learning/knowledge-scenes/jobs/ {
    limit_req zone=axiom_firecup_poll burst=20 nodelay;
    limit_req_status 429;

    proxy_pass http://127.0.0.1:5010;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_connect_timeout 5s;
    proxy_send_timeout 15s;
    proxy_read_timeout 15s;
}
