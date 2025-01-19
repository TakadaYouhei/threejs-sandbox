# syntax=docker/dockerfile:1.3-labs
FROM node:23.6.0-slim

# 新しい entrypoint を設定
RUN <<eot
echo '#! /usr/bin/bash
echo "Hello, World!"
exec docker-entrypoint.sh "$@"
' > /usr/local/bin/myentrypoint.sh
chmod +x /usr/local/bin/myentrypoint.sh
eot
ENTRYPOINT ["/usr/local/bin/myentrypoint.sh"]

CMD ["/bin/bash"]
