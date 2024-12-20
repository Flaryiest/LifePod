import pygame
import threading
from pocketsphinx import LiveSpeech

speech = []
clock = pygame.time.Clock()

class Circle:
    def __init__(self, display, x=(1080 // 2), y=(1920 // 2), colour=(168, 50, 50), radius=0):
        self.display = display
        self.x, self.y = x, y
        self.colour = colour
        self.radius = radius

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
microphone = pygame.image.load("assets\\microphone.png")

if __name__ == "__main__":
    transcribe_t = threading.Thread(target=transcribe, daemon=True)
    transcribe_t.start()
    run = True
    while run:
        event = pygame.event.get()
        print(speech)
        screen.fill((51, 92, 78))

        circle.increase(30)
        circle.render()

        pygame.display.blit((0, 0), microphone)

        pygame.display.flip()
        clock.tick(60)