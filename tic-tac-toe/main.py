import os

current_player = 'PLAYER ONE'
current_move = 0 

state = [
    1, 2, 3, 
    4, 5, 6,
    7, 8, 9
]

def board_state():
    print()
    print(f'  {state[0]}  |  {state[1]}  |  {state[2]}')
    print('-----------------')
    print(f'  {state[3]}  |  {state[4]}  |  {state[5]}')
    print('-----------------')
    print(f'  {state[6]}  |  {state[7]}  |  {state[8]}')
    print()


def check_win():
    if (state[0] == state[1] == state[2]) or (state[3] == state[4] == state[5]) or (state[6] == state[7] == state[8]):
        print(f'{current_player} WON!')
        print('\n******************** Game Ended ********************')
        exit()
    elif (state[0] == state[3] == state[6]) or (state[1] == state[4] == state[7]) or (state[2] == state[5] == state[8]):
        print(f'{current_player} WON!')
        print('\n******************** Game Ended ********************')
        exit()
    elif (state[0] == state[4] == state[8]) or (state[2] == state[4] == state[6]):
        print(f'{current_player} WON!')
        print('\n******************** Game Ended ********************')
        exit()
    elif current_move > 8:
        print('THE GAME IS A TIE!')
        print('\n******************** Game Ended ********************')
        exit()


def game():
    while True:
        turn = True 
        global current_player
        global current_move
        current_move += 1        

        board_state()

        while turn:
            print(f'\n{current_player} where would you like to move?')
            move = int(input('Enter the number of where you would like to move: '))

            if (move >= 1 and move <= 9) and (state[move-1] == move):
                turn = False
        
        if current_player == 'PLAYER ONE':
            state[move-1] = 'X'
            check_win()
            current_player = 'PLAYER TWO'
            os.system('cls' if os.name == 'nt' else 'clear')

        elif current_player == 'PLAYER TWO':
            state[move-1] = 'O'
            check_win()
            current_player = 'PLAYER ONE'
            os.system('cls' if os.name == 'nt' else 'clear')


if __name__ == '__main__':
    game()
    
