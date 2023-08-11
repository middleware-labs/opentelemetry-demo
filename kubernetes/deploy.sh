kubectl config use-context  mw-demo-env
kubectl create ns otel-demo || true
eval "$(cat ./.env | grep '\S' | sed 's/^/export /' | sed 's/\r$//')"

cat ./opentelemetry-demo.yaml | yq | envtmpl -dl "<{" -dr "}>" - > ./opentelemetry-demo.yaml.final
kubectl apply -f opentelemetry-demo.yaml.final  -n otel-demo

cat ./mongo.yaml | yq | envtmpl -dl "<{" -dr "}>" - > ./mongo.final
kubectl apply -f mongo.final  -n otel-demo

rm ./opentelemetry-demo.yaml.final
rm ./mongo.final