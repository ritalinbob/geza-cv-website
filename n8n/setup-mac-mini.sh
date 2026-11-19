#!/usr/bin/env bash
# ==============================================================================
# AI Resume Chat Assistant - Mac mini M4 Setup Script
# Host: Gezas-Mac-mini.local
# User: gezahorvath
# ==============================================================================

set -e

echo "--------------------------------------------------------"
echo "🚀 Initializing AI Resume Assistant on Mac mini M4..."
echo "--------------------------------------------------------"

# 1. Create target data directory
mkdir -p ~/resume-ai
cd ~/resume-ai

# 2. Check and install Ollama
if ! command -v ollama &> /dev/null; then
  echo "📦 Ollama not found. Installing via Homebrew..."
  if command -v brew &> /dev/null; then
    brew install ollama
  else
    echo "❌ Homebrew not detected. Please install Ollama from https://ollama.com"
    exit 1
  fi
else
  echo "✅ Ollama is installed."
fi

# 3. Ensure Ollama is running with optimized M4 unified memory settings
export OLLAMA_HOST="0.0.0.0"
export OLLAMA_KEEP_ALIVE="-1"
export OLLAMA_MAX_LOADED_MODELS="2"
export OLLAMA_NUM_PARALLEL="1"
export OLLAMA_FLASH_ATTENTION="1"
export OLLAMA_KV_CACHE_TYPE="q8_0"

if ! pgrep -x "ollama" > /dev/null; then
  echo "Starting Ollama server in background..."
  nohup /usr/local/bin/ollama serve > ~/resume-ai/ollama.log 2>&1 &
  sleep 3
else
  echo "✅ Ollama server is currently running."
fi

# 4. Pull & pre-warm Qwen 2.5 7B (EN/DE) and Hermes 3 8B (HU) models
echo "📥 Ensuring qwen2.5:7b and hermes3:8b models are present in Ollama..."
/usr/local/bin/ollama pull qwen2.5:7b
/usr/local/bin/ollama pull hermes3:8b

# 5. Check and configure Tailscale Funnel
if command -v tailscale &> /dev/null; then
  echo "🌐 Configuring Tailscale Funnel for port 5678..."
  tailscale funnel --bg 5678 || echo "ℹ️ If Tailscale Funnel requires authorization, visit your Tailscale admin console."
else
  echo "ℹ️ Tailscale CLI not found in PATH. If installed as Mac App, use the Tailscale app menu or brew install tailscale."
fi

# 6. Test local Ollama inference
echo "🧪 Running test inference on local qwen2.5:7b..."
curl -s http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:7b",
  "prompt": "How many years of ServiceNow experience does Géza have?",
  "system": "Answer strictly: Géza Horváth has 8+ years of dedicated ServiceNow experience (since 2018).",
  "stream": false
}' | grep -o '"response":"[^"]*"' | head -n 1 || echo "Inference test completed."

echo ""
echo "--------------------------------------------------------"
echo "🎉 Setup complete!"
echo "Next step: In n8n, go to Workflows -> Import from File and select:"
echo "~/resume-ai/resume-chat-workflow.json"
echo "--------------------------------------------------------"
