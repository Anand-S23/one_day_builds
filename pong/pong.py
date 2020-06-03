# Pong
import pygame 
import random
import math
import time
from colors import *
from os import path

img_dir = path.join(path.dirname(__file__), 'img')

width = 800
height = 600
fps = 30

# initalize pygame and create window 
pygame.init()
pygame.mixer.init()
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption('Pong')
clock = pygame.time.Clock()

font_name = pygame.font.match_font('arial')
def draw_text(surf, text, size, x, y):
    font = pygame.font.Font(font_name, size)
    text_surface = font.render(text, True, white)
    text_rect = text_surface.get_rect()
    text_rect.midtop = (x, y)
    surf.blit(text_surface, text_rect)

class Player(pygame.sprite.Sprite):
    def __init__(self, side):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.Surface((20, 128))
        self.image.fill(white)
        self.rect = self.image.get_rect()
        self.rect.centerx = 20 if side == 'right' else width - 20
        self.rect.centery = height / 2
        self.speedy = 0
        self.side = side

    def reset(self):
        self.rect.centerx = 20
        self.rect.centery = height / 2

    def update(self):
        self.speedy = 0
        keystate = pygame.key.get_pressed() 

        if self.side == 'right':
            if keystate[pygame.K_w]:
                self.speedy = -7
            if keystate[pygame.K_s]:
                self.speedy = 7

        if self.side == 'left':
            if keystate[pygame.K_UP]:
                self.speedy = -7
            if keystate[pygame.K_DOWN]:
                self.speedy = 7
        
        self.rect.y += self.speedy

        if self.rect.top < 4:
            self.rect.top = 4
        elif self.rect.bottom > height - 4:
            self.rect.bottom = height - 4 

class Ball(pygame.sprite.Sprite):
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.Surface((23, 23))
        self.image.fill(white)
        self.rect = self.image.get_rect()
        self.rect.centerx = width / 2
        self.rect.centery = height / 2
        self.angle = random.uniform(-1, 1)
        self.dy = 7
        self.dx = 7
        self.time_passed = pygame.time.get_ticks()

    def reset(self):
        self.rect.x = width / 2
        self.rect.y = height / 2
    
    def update(self):
        self.rect.y += self.dy
        self.rect.x += self.dx

        if self.rect.top < 0:
            self.dy = self.dy * -1
        elif self.rect.bottom > height:
            self.dy = self.dy * -1

background = pygame.image.load(path.join(img_dir, 'background.png')).convert()
background_rect = background.get_rect()

all_sprites = pygame.sprite.Group()
paddle = pygame.sprite.Group()

player_left = Player('right')
player_right = Player('left')
ball = Ball()

all_sprites.add(player_left, player_right, ball)
paddle.add(player_left, player_right)

sp1 = 0
sp2 = 0

# Game loop 
running = True 
while running:
    # Setting the fps 
    clock.tick(fps)

    # Process input (events)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Update 
    all_sprites.update()
    
    hit_left = pygame.sprite.spritecollide(ball, paddle, False)
    if hit_left:
        ball.dx = ball.dx * -1

    if ball.rect.left <= 0:
        sp1 += 1
        time.sleep(.25)
        ball.reset()
    elif ball.rect.right >= width:
        sp2 += 1
        time.sleep(.25)
        ball.reset()
        player_left.reset()
        player_right.reset()
        time.sleep(.25)
        
    # Draw / Render
    screen.fill(black)
    screen.blit(background, background_rect)
    all_sprites.draw(screen)
    draw_text(screen, str(sp2), 30, width / 4, 30)
    draw_text(screen, str(sp1), 30, (width / 4) * 3, 30)
    pygame.display.flip()

pygame.quit()