export interface Message {
  id?: number;
  out: boolean;
  text: string | string[];
  delay?: number;
  responseId: number;
  logoAnim?: Animation;
}

export interface Animation {
  play?: number;
  stop?: boolean;
  reset?: boolean;
  finish?: boolean;
  setFrameProgress?: number;
}

export interface ChatOption {
  id: number;
  options: Message[];
}

export const collectiveChatData: Message[] = [
  {
    id: 1,
    out: false,
    text: 'What the fuck do you want?',
    responseId: 1,
  },
  {
    id: 2,
    out: false,
    text: 'Uhhh, it\'s a conversation... what do you want?',
    responseId: 2,
  },
  {
    id: 3,
    out: false,
    text: ['...', 'clearly.', 'again, what do you want?'],
    delay: 600,
    responseId: 4,
  },
  {
    id: 4,
    out: false,
    text: 'leave your email and we\'ll be in touch',
    responseId: 3,
  },
  {
    id: 5,
    out: false,
    text: ['Who?', 'I am a machine', ],
    responseId: 4,
  },
  {
    id: 6,
    out: false,
    text: ['A conversation...', 'you know, I talk to you, and you talk to me.', 'Are you sure you should be allowed on the internet?'],
    responseId: 4,
  },
  {
    id: 7,
    out: false,
    text: ['fine'],
    logoAnim: { play: 1 },
    responseId: 4,
  }
];

export const userChatOptions: ChatOption[] = [
  {
    id: 1,
    options: [
      {
        out: true,
        text: 'What is this?',
        responseId: 2,
      },
      {
        out: true,
        text: 'What am I looking at?',
        responseId: 2,
      },
      {
        out: true,
        text: 'Did I interrupt something?',
        responseId: 3,
      },
      {
        out: true,
        text: 'I want to talk with the uncommon',
        responseId: 4,
      }
    ]
  },
  {
    id: 2,
    options: [
      {
        out: true,
        text: 'If this is a conversation, who am I speaking with?',
        responseId: 5,
      },
      {
        out: true,
        text: 'What do you mean by "conversation"?',
        responseId: 6,
      },
      {
        out: true,
        text: 'Did I interrupt something?',
        responseId: 3,
      },
      {
        out: true,
        text: 'I want to talk with the uncommon.',
        responseId: 4,
      }
    ]
  },
  {
    id: 3,
    options: [
      {
        out: true,
        text: 'MAKE THIS AN INPUT BOX SOMEHOW',
        responseId: 2,
      }
    ]
  },
  {
    id: 4,
    options: [
      {
        out: true,
        text: 'What am I looking at?',
        responseId: 2,
      },
      {
        out: true,
        text: 'Can you finish whatever it is I interrupted?',
        responseId: 7,
      },
    ]
  }
];
