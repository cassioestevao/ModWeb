const balls = document.querySelectorAll('.ball');

const speed = 1;

function updateBalls() {
    balls.forEach(ball => {
        let posX = parseFloat(ball.dataset.posX) || Math.random() * window.innerWidth;
        let posY = parseFloat(ball.dataset.posY) || Math.random() * window.innerHeight;
        let velX = parseFloat(ball.dataset.velX) || (Math.random() - 0.5) * speed;
        let velY = parseFloat(ball.dataset.velY) || (Math.random() - 0.5) * speed;

        posX += velX;
        posY += velY;

        if (posX + ball.offsetWidth > window.innerWidth || posX < 0) {
            velX = -velX;
        }
        if (posY + ball.offsetHeight > window.innerHeight || posY < 0) {
            velY = -velY;
        }

        ball.dataset.posX = posX;
        ball.dataset.posY = posY;
        ball.dataset.velX = velX;
        ball.dataset.velY = velY;

        ball.style.transform = `translate(${posX}px, ${posY}px)`;
    });
}

function animate() {
    updateBalls();
    requestAnimationFrame(animate);
}

balls.forEach(ball => {
    ball.dataset.posX = Math.random() * window.innerWidth;
    ball.dataset.posY = Math.random() * window.innerHeight;
    ball.dataset.velX = (Math.random() - 0.5) * speed;
    ball.dataset.velY = (Math.random() - 0.5) * speed;
});

animate();
