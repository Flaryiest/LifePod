import pygame
import threading
from pocketsphinx import LiveSpeech
from pygame.locals import QUIT, MOUSEBUTTONDOWN

speech = []
clock = pygame.time.Clock()

class Circle:
    def __init__(self, display, x=(1080 // 2), y=(1920 // 2), colour=(168, 50, 50), radius=0):
        self.display = display
        self.x, self.y = x, y
        self.colour = colour
        self.radius = radius
        self.active = False

    def increase(self, step):
        self.radius += step
    
    def render(self):
        pygame.draw.circle(self.display, self.colour, (self.x, self.y), self.radius)

def transcribe():
    global speech
    for phrase in LiveSpeech():
        speech.append(str(phrase))

screen = pygame.display.set_mode((1080, 1920), display=1)

circle = Circle(screen)
microphone = pygame.image.load("Hardware\\assets\\microphone.png")

if __name__ == "__main__":
    transcribe_t = threading.Thread(target=transcribe, daemon=True)
    transcribe_t.start()
    running = True
    while running:
        events = pygame.event.get()
        collide = pygame.Rect(1080 // 2 - 150, 1920 // 2 - 150, 300, 300)
        for event in events:
            if event.type == pygame.QUIT:
                running = False
            if event.type == MOUSEBUTTONDOWN:
                if collide.collidepoint(event.pos):  # Check if mouse collides with rect
                    circle.active = not circle.active

        print(" ".join(speech))
        screen.fill((51, 92, 78))

        if circle.radius < 1920 and circle.active:
            circle.increase(30)
        else:
            if circle.radius > 30:
                circle.increase(-30)
        circle.render()

        
        screen.blit(microphone, (1080 // 2 - 150, 1920 // 2 - 150))
    
        pygame.display.flip()
        clock.tick(60)