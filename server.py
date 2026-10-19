#!/usr/bin/env python3
"""
Lightweight Static Web Server with AI Chat Reverse Proxy
Serves static portfolio files and proxies /api/chat to Mac mini M4 (n8n on port 5678)
"""

import http.server
import urllib.request
import urllib.error
import sys
import os

PORT = 3000
MAC_MINI_ENDPOINTS = [
    "http://Gezas-Mac-mini.local:5678/webhook/resume-chat",
    "http://192.168.1.248:5678/webhook/resume-chat",
    "http://192.168.1.128:5678/webhook/resume-chat",
]

class ProxyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="/home/gezahorvath/Projects", **kwargs)

    def do_OPTIONS(self):
        if self.path == "/api/chat":
            self.send_response(204)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type, Accept")
            self.end_headers()
        else:
            super().do_OPTIONS()

    def do_POST(self):
        if self.path == "/api/chat":
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length)

            for endpoint in MAC_MINI_ENDPOINTS:
                try:
                    req = urllib.request.Request(
                        endpoint,
                        data=post_body,
                        headers={
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        method="POST"
                    )
                    with urllib.request.urlopen(req, timeout=15) as response:
                        res_data = response.read()
                        self.send_response(200)
                        self.send_header("Content-Type", "application/json")
                        self.send_header("Access-Control-Allow-Origin", "*")
                        self.end_headers()
                        self.wfile.write(res_data)
                        return
                except Exception as e:
                    print(f"[Proxy] Error contacting {endpoint}: {e}", file=sys.stderr)
                    continue

            # Fallback if both unreachable
            self.send_response(502)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(b'{"status":"error","message":"Mac mini unreachable"}')
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    server_address = ("", PORT)
    httpd = http.server.HTTPServer(server_address, ProxyHTTPRequestHandler)
    print(f"🚀 Server running at http://localhost:{PORT}/ with /api/chat proxy to Mac mini M4")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server.")
        sys.exit(0)
