import { StepData, TroubleshootingItem, CheatsheetItem, ScopeItem, BestPractice, Testimonial } from '../types';

export const STEPS_DATA: StepData[] = [
  {
    id: 0,
    emoji: '🔑',
    title: {
      hi: 'पहला कदम : Personal Access Token (PAT) बनायें',
      en: 'Step 0 : Create Personal Access Token (PAT)'
    },
    subtitle: {
      hi: 'GitHub पर पासवर्ड की जगह Token चाहिए। बिना Token के MGit काम नहीं करेगा।',
      en: 'GitHub requires a Token instead of a password. MGit cannot authenticate without it.'
    },
    description: {
      hi: 'अगस्त 2021 से GitHub ने सामान्य पासवर्ड से Git ऑपरेशन्स बंद कर दिए हैं। अब आपको अपने अकाउंट से एक सुरक्षित Personal Access Token बनाना होगा जो पासवर्ड के रूप में कार्य करेगा।',
      en: 'Since August 2021, GitHub no longer accepts account passwords when authenticating Git operations. You must generate a secure Personal Access Token to act as your password.'
    },
    codeSteps: {
      hi: [
        'GitHub.com पर लॉग इन करें और Settings में जाएँ।',
        'सबसे नीचे Developer settings > Personal access tokens > Tokens (classic) पर क्लिक करें।',
        '"Generate new token (classic)" बटन पर क्लिक करें।',
        'Note में "MGit-Android" लिखें और Expiration अपने अनुसार (जैसे 90 days या No expiration) चुनें।',
        'Scopes में कम से कम **repo** (पूरा कंट्रोल) और **workflow** (GitHub Actions के लिए) को चेक करें।',
        'Generate token पर क्लिक करें और **टोकन को तुरंत कॉपी करके कहीं सुरक्षित सेव कर लें** (यह दोबारा नहीं दिखेगा!)।'
      ],
      en: [
        'Log in to GitHub.com and navigate to your Settings.',
        'Scroll down to Developer settings > Personal access tokens > Tokens (classic).',
        'Click the "Generate new token (classic)" button.',
        'Set the Note to "MGit-Android" and choose an Expiration (e.g., 90 days or No expiration).',
        'In Scopes, check **repo** (full repository access) and **workflow** (to update actions).',
        'Click Generate token and **immediately copy the token to a secure place** (it will never be shown again!).'
      ]
    },
    tip: {
      type: 'warning',
      hi: 'टोकन को अपने फोन के किसी सुरक्षित नोट ऐप या पासवर्ड मैनेजर में सेव करें। जब भी MGit पासवर्ड माँगे, आपको यही टोकन पेस्ट करना होगा।',
      en: 'Save this token in a secure notes app or password manager on your phone. Whenever MGit asks for a password, paste this token.'
    },
    cliEquivalent: '# No direct CLI equivalent. Managed via GitHub Web UI or GitHub CLI:\ngh auth login --with-token',
    imageSchematicType: 'token'
  },
  {
    id: 1,
    emoji: '📥',
    title: {
      hi: 'क्लोन (Clone) करें – रिपॉजिटरी डाउनलोड करें',
      en: 'Clone – Download the Repository'
    },
    subtitle: {
      hi: 'MGit में नई रिपॉजिटरी ऐड करें और GitHub से अपने फोन में क्लोन करें।',
      en: 'Add a new repository in MGit and clone it from GitHub to your Android device.'
    },
    description: {
      hi: 'क्लोनिंग का मतलब है GitHub के सर्वर से पूरे प्रोजेक्ट की एक लोकल कॉपी आपके एंड्रॉइड फोन के स्टोरेज में डाउनलोड करना। इसके बाद आप बिना इंटरनेट के भी कोड देख और बदल सकते हैं।',
      en: 'Cloning downloads a complete local copy of your project from GitHub servers directly to your Android storage. You can then view and edit code even without an internet connection.'
    },
    codeSteps: {
      hi: [
        'MGit ऐप खोलें और ऊपर दिए गए **"+" (Plus)** आइकन पर टैप करें।',
        '**"Clone Remote Repository"** का विकल्प चुनें।',
        'Remote URL में अपनी रिपॉजिटरी का लिंक डालें (उदा. https://github.com/username/repo-name.git)',
        'Username में अपना GitHub यूजरनेम लिखें।',
        'Password में **ऊपर बनाया हुआ Personal Access Token (PAT)** पेस्ट करें।',
        '**"Clone"** बटन दबाएँ और डाउनलोड पूरा होने का इंतजार करें।'
      ],
      en: [
        'Open the MGit app and tap the **"+" (Plus)** icon at the top.',
        'Select the **"Clone Remote Repository"** option.',
        'Enter your repository link in the Remote URL field (e.g., https://github.com/username/repo-name.git)',
        'Enter your GitHub username in the Username field.',
        'In the Password field, paste the **Personal Access Token (PAT)** you generated earlier.',
        'Tap the **"Clone"** button and wait for the download to complete.'
      ]
    },
    tip: {
      type: 'info',
      hi: 'अगर GitHub पर रिपॉजिटरी पहले से मौजूद नहीं है, तो पहले ब्राउज़र में जाकर GitHub पर नई रिपॉजिटरी बनाएँ।',
      en: 'If the repository does not exist on GitHub yet, create a new repository in your web browser first.'
    },
    cliEquivalent: 'git clone https://github.com/username/repo-name.git',
    imageSchematicType: 'clone'
  },
  {
    id: 2,
    emoji: '✏️',
    title: {
      hi: 'कोड में बदलाव / फाइलें डालें',
      en: 'Modify Code & Add Files'
    },
    subtitle: {
      hi: 'अपने प्रोजेक्ट की फाइलों को MGit के क्लोन किए गए फोल्डर में कॉपी करें या एडिट करें।',
      en: 'Copy your project files into the cloned MGit folder or edit them directly.'
    },
    description: {
      hi: 'MGit आपके फोन की इंटरनल स्टोरेज में एक फोल्डर बनाता है। आप किसी भी कोड एडिटर (जैसे Acode, TrebEdit या Spck Editor) का उपयोग करके इन फाइलों को सीधे एडिट कर सकते हैं।',
      en: 'MGit creates a dedicated folder in your phone internal storage. You can use any Android code editor (like Acode, TrebEdit, or Spck Editor) to edit these files directly.'
    },
    codeSteps: {
      hi: [
        'अपने फोन के **File Manager** या कोड एडिटर में जाएँ।',
        'पाथ खोलें: **Internal Storage > MGit > आपकी रिपॉजिटरी का नाम**',
        'यहाँ अपनी सारी कोड फाइलें (जैसे .html, .java, .kt, .js, .css) डालें, नई फाइलें बनाएँ या मौजूदा फाइलों को एडिट करें।',
        'बदलावों को सेव करें और वापस **MGit** ऐप में आएँ।',
        'रिपॉजिटरी पर टैप करें और स्क्रीन को नीचे खींचकर **Refresh** करें – आपके सारे बदलाव दिखने लगेंगे।'
      ],
      en: [
        'Open your phone **File Manager** or preferred code editor.',
        'Navigate to: **Internal Storage > MGit > your-repo-name**',
        'Add your code files (e.g., .html, .java, .kt, .js, .css), create new files, or edit existing ones.',
        'Save your changes and switch back to the **MGit** app.',
        'Tap on your repository and pull down to **Refresh** – all your modified files will appear.'
      ]
    },
    tip: {
      type: 'success',
      hi: 'आप कोडिंग के लिए "Acode" या "Spck Editor" का उपयोग कर सकते हैं, जो MGit के फोल्डर को सीधे वर्कस्पेस के रूप में खोल सकते हैं!',
      en: 'You can use "Acode" or "Spck Editor" for coding, as they can open the MGit folder directly as a workspace!'
    },
    cliEquivalent: '# Open files in your editor, make changes, then check status:\ngit status',
    imageSchematicType: 'edit'
  },
  {
    id: 3,
    emoji: '📌',
    title: {
      hi: 'Stage करें और Commit करें (लोकल सेव)',
      en: 'Stage and Commit (Save Locally)'
    },
    subtitle: {
      hi: 'बदलावों को Git में जोड़ें और एक सार्थक संदेश के साथ सेव करें।',
      en: 'Add your changes to Git and save them with a meaningful commit message.'
    },
    description: {
      hi: 'Git में किसी भी बदलाव को अपलोड करने से पहले उसे "Stage" (तैयार) करना होता है और फिर "Commit" (पक्का) करना होता है। Commit आपके फोन में एक सुरक्षित चेकपॉइंट बना देता है।',
      en: 'In Git, before uploading changes, you must "Stage" them and then "Commit" them. A commit creates a secure, permanent checkpoint of your code on your local device.'
    },
    codeSteps: {
      hi: [
        'MGit में अपनी रिपॉजिटरी खोलें। **"Status"** टैब में आपको सभी बदली हुई या नई फाइलें (लाल रंग में) दिखेंगी।',
        'ऊपर दाएँ कोने में **☰ (मेन्यू)** पर टैप करें और **"Add all to stage"** चुनें। (फाइलें अब हरे रंग की हो जाएँगी)।',
        'नीचे दिए गए **"Commit"** आइकन (चेकमार्क) पर टैप करें।',
        'एक स्पष्ट संदेश लिखें, जैसे: "Added login screen" या "Fixed CSS bugs"।',
        'मैसेज के नीचे दिए गए **"Commit"** बटन को दबाकर प्रक्रिया पूरी करें।'
      ],
      en: [
        'Open your repository in MGit. In the **"Status"** tab, you will see all modified or new files (in red).',
        'Tap the **☰ (Menu)** at the top right and select **"Add all to stage"**. (Files will turn green).',
        'Tap the **"Commit"** icon (checkmark) at the bottom.',
        'Enter a clear commit message, such as: "Added login screen" or "Fixed CSS bugs".',
        'Press the **"Commit"** button below the text area to finalize your local save.'
      ]
    },
    tip: {
      type: 'warning',
      hi: 'Commit करने से कोड केवल आपके फोन में सेव होता है! यह अभी तक GitHub पर नहीं गया है। इसके लिए अगला कदम उठाना अनिवार्य है।',
      en: 'Committing only saves the code on your phone! It has not been sent to GitHub yet. You must perform the next step to upload.'
    },
    cliEquivalent: 'git add .\ngit commit -m "Your meaningful commit message"',
    imageSchematicType: 'stage'
  },
  {
    id: 4,
    emoji: '🚀',
    title: {
      hi: 'Push करें – GitHub पर अपलोड करें',
      en: 'Push – Upload to GitHub'
    },
    subtitle: {
      hi: 'अब कोड दुनिया के सामने लाएँ। लोकल Commit को Remote (GitHub) पर भेजें।',
      en: 'Publish your code to the world. Send your local commits to the Remote (GitHub).'
    },
    description: {
      hi: 'Push ऑपरेशन आपके लोकल फोन के कमिट्स को सुरक्षित रूप से GitHub के सर्वर पर अपलोड कर देता है। इसके बाद आपका कोड लाइव हो जाता है और कोई भी उसे देख सकता है।',
      en: 'The Push operation securely uploads your local commits to the GitHub servers. Once pushed, your code is live and accessible to your team or the public.'
    },
    codeSteps: {
      hi: [
        'MGit में अपनी रिपॉजिटरी के मुख्य पेज पर रहें।',
        'ऊपर दाएँ कोने में **☰ (मेन्यू)** पर टैप करें और **"Push"** का चयन करें।',
        'Remote में **origin** चुना हुआ होना चाहिए।',
        'Branch में अपनी सही ब्रांच चुनें (आमतौर पर **main** या **master**)।',
        'यदि ऐप दोबारा Password माँगे, तो अपना **Personal Access Token (PAT)** पेस्ट करें।',
        '**"Push"** बटन पर टैप करें। "Push successful" का संदेश आने पर आपका काम पूरा हो गया!'
      ],
      en: [
        'Go to the main screen of your repository in MGit.',
        'Tap the **☰ (Menu)** at the top right and select **"Push"**.',
        'Ensure the Remote is set to **origin**.',
        'Select your correct Branch (usually **main** or **master**).',
        'If the app prompts for a Password again, paste your **Personal Access Token (PAT)**.',
        'Tap the **"Push"** button. When you see "Push successful", your code is live!'
      ]
    },
    tip: {
      type: 'success',
      hi: 'बधाई हो! अब अपने ब्राउज़र में GitHub रिपॉजिटरी खोलें और पेज को रिफ्रेश करें। आपका सारा कोड वहाँ मौजूद होगा।',
      en: 'Congratulations! Open your GitHub repository in a web browser and refresh the page. All your code will be instantly visible.'
    },
    cliEquivalent: 'git push origin main',
    imageSchematicType: 'push'
  }
];

export const TROUBLESHOOTING_DATA: TroubleshootingItem[] = [
  {
    id: 'auth-fail',
    error: {
      hi: 'Authentication failed / 401 Unauthorized',
      en: 'Authentication failed / 401 Unauthorized'
    },
    cause: {
      hi: 'आपने अपने GitHub अकाउंट का असली पासवर्ड डाला है, या आपका Personal Access Token (PAT) एक्सपायर हो चुका है।',
      en: 'You entered your actual GitHub account password, or your Personal Access Token (PAT) has expired.'
    },
    solution: {
      hi: 'GitHub पर पासवर्ड काम नहीं करता। Step 0 के अनुसार एक नया Personal Access Token (PAT) बनाएँ और MGit में पासवर्ड की जगह उसे पेस्ट करें। ध्यान रहे कि टोकन में "repo" स्कोप सिलेक्टेड हो।',
      en: 'GitHub does not accept account passwords. Generate a new Personal Access Token (PAT) following Step 0 and paste it instead of your password. Ensure the "repo" scope is checked.'
    },
    tags: ['Token', 'Login', 'Password']
  },
  {
    id: 'rejected-updates',
    error: {
      hi: 'Updates were rejected / non-fast-forward',
      en: 'Updates were rejected / non-fast-forward'
    },
    cause: {
      hi: 'GitHub पर कुछ ऐसे बदलाव हैं जो आपके फोन में नहीं हैं (जैसे किसी और ने कोड पुश किया हो या आपने GitHub पर सीधे फाइल एडिट की हो)।',
      en: 'There are commits on GitHub that you do not have locally (e.g., someone else pushed code, or you edited a file directly on GitHub).'
    },
    solution: {
      hi: 'पहले GitHub से लेटेस्ट कोड अपने फोन में मँगाएँ। MGit के मेन्यू में जाएँ और **"Pull"** पर टैप करें। अगर कोई कन्फ्लिक्ट न हो, तो इसके बाद दोबारा **"Push"** करें।',
      en: 'First, fetch the latest code from GitHub. Go to the MGit menu and tap **"Pull"**. Once merged successfully, try to **"Push"** again.'
    },
    tags: ['Push', 'Pull', 'Sync']
  },
  {
    id: 'files-missing',
    error: {
      hi: 'फाइलें Status टैब में नहीं दिख रहीं',
      en: 'Files not showing in Status tab'
    },
    cause: {
      hi: 'फाइलें गलत फोल्डर में कॉपी हो गई हैं या MGit ने अभी तक स्टोरेज को री-स्कैन नहीं किया है।',
      en: 'Files were copied to the wrong folder, or MGit has not re-scanned the local storage yet.'
    },
    solution: {
      hi: 'सुनिश्चित करें कि फाइलें सही पाथ `Internal Storage > MGit > repo-name` के अंदर ही हैं। MGit ऐप में रिपॉजिटरी खोलकर स्क्रीन को ऊपर से नीचे खींचें (Swipe down to refresh) या ऐप को बंद करके दोबारा खोलें।',
      en: 'Ensure files are placed exactly inside `Internal Storage > MGit > repo-name`. Open the repository in MGit and swipe down to refresh, or restart the app.'
    },
    tags: ['Files', 'Storage', 'Refresh']
  },
  {
    id: 'branch-error',
    error: {
      hi: 'Branch master vs main भ्रम / Push error',
      en: 'Branch master vs main confusion / Push error'
    },
    cause: {
      hi: 'पुरानी गिट रिपॉजिटरी डिफ़ॉल्ट रूप से `master` ब्रांच का उपयोग करती थीं, जबकि नई रिपॉजिटरी `main` का उपयोग करती हैं। आप गलत ब्रांच में पुश कर रहे हैं।',
      en: 'Older Git repositories used `master` as the default branch, while newer ones use `main`. You might be pushing to the wrong branch.'
    },
    solution: {
      hi: 'GitHub पर अपनी रिपॉजिटरी खोलकर चेक करें कि मुख्य ब्रांच का नाम `main` है या `master`। MGit में Push करते समय Branch के विकल्प में सही नाम टाइप करें या सिलेक्ट करें।',
      en: 'Check your GitHub repository in a browser to see if the default branch is `main` or `master`. When pushing in MGit, select or type the exact branch name.'
    },
    tags: ['Branch', 'Push', 'GitHub']
  },
  {
    id: 'merge-conflict',
    error: {
      hi: 'Pull करते समय Merge Conflict आना',
      en: 'Merge Conflict during Pull'
    },
    cause: {
      hi: 'आपने और GitHub पर किसी और ने एक ही फाइल की एक ही लाइन में अलग-अलग बदलाव कर दिए हैं।',
      en: 'You and someone else modified the exact same line of a file differently.'
    },
    solution: {
      hi: 'MGit आपको कन्फ्लिक्ट वाली फाइलें दिखाएगा। अपने कोड एडिटर में उस फाइल को खोलें, `<<<<<<<` और `>>>>>>>` वाले निशानों को देखकर सही कोड रखें, फाइल सेव करें, और MGit में आकर उसे Stage और Commit करें।',
      en: 'MGit will flag the conflicted files. Open the file in your code editor, locate the conflict markers (`<<<<<<<` and `>>>>>>>`), keep the desired code, save, then Stage and Commit in MGit.'
    },
    tags: ['Pull', 'Conflict', 'Code']
  }
];

export const CHEATSHEET_DATA: CheatsheetItem[] = [
  {
    gitCommand: 'git clone <url>',
    mgitAction: {
      hi: '"+" आइकन > "Clone Remote Repository"',
      en: '"+" icon > "Clone Remote Repository"'
    },
    description: {
      hi: 'GitHub से प्रोजेक्ट को पहली बार अपने फोन में डाउनलोड करना।',
      en: 'Download the project from GitHub to your phone for the first time.'
    }
  },
  {
    gitCommand: 'git status',
    mgitAction: {
      hi: 'रिपॉजिटरी पर टैप करें > "Status" टैब देखें',
      en: 'Tap repository > View "Status" tab'
    },
    description: {
      hi: 'यह देखना कि कौन सी फाइलें बदली गई हैं या नई जोड़ी गई हैं।',
      en: 'Check which files have been modified, added, or deleted.'
    }
  },
  {
    gitCommand: 'git add .',
    mgitAction: {
      hi: '☰ मेन्यू > "Add all to stage"',
      en: '☰ Menu > "Add all to stage"'
    },
    description: {
      hi: 'सभी बदलावों को कमिट करने के लिए तैयार (Stage) करना।',
      en: 'Stage all modified and new files for the next commit.'
    }
  },
  {
    gitCommand: 'git commit -m "message"',
    mgitAction: {
      hi: 'Commit आइकन > संदेश लिखें > "Commit" दबाएँ',
      en: 'Commit icon > Type message > Press "Commit"'
    },
    description: {
      hi: 'बदलावों को अपने फोन में एक स्थायी चेकपॉइंट के रूप में सेव करना।',
      en: 'Save your staged changes as a permanent checkpoint on your phone.'
    }
  },
  {
    gitCommand: 'git push origin main',
    mgitAction: {
      hi: '☰ मेन्यू > "Push" > Remote व Branch चुनें',
      en: '☰ Menu > "Push" > Select Remote & Branch'
    },
    description: {
      hi: 'अपने लोकल कमिट्स को GitHub के लाइव सर्वर पर अपलोड करना।',
      en: 'Upload your local commits to the live GitHub remote server.'
    }
  },
  {
    gitCommand: 'git pull origin main',
    mgitAction: {
      hi: '☰ मेन्यू > "Pull"',
      en: '☰ Menu > "Pull"'
    },
    description: {
      hi: 'GitHub पर हुए नए बदलावों को अपने फोन में मँगाना और सिंक करना।',
      en: 'Fetch and merge the latest changes from GitHub into your local phone.'
    }
  }
];

export const SCOPES_DATA: ScopeItem[] = [
  {
    id: 'repo',
    name: 'repo',
    description: {
      hi: 'प्राइवेट और पब्लिक रिपॉजिटरी का पूरा कंट्रोल। कोड पुश और पुल करने के लिए यह सबसे ज़रूरी है।',
      en: 'Full control of private and public repositories. This is the most critical scope for pushing and pulling code.'
    },
    requiredFor: ['Clone', 'Push', 'Pull', 'Branch creation'],
    recommended: true
  },
  {
    id: 'workflow',
    name: 'workflow',
    description: {
      hi: 'GitHub Actions की कॉन्फ़िगरेशन फ़ाइलों को अपडेट करने की अनुमति देता है। यदि आपके प्रोजेक्ट में CI/CD है तो यह आवश्यक है।',
      en: 'Allows updating GitHub Actions configuration files. Required if your repository uses automated CI/CD workflows.'
    },
    requiredFor: ['Updating .github/workflows files'],
    recommended: true
  },
  {
    id: 'gist',
    name: 'gist',
    description: {
      hi: 'Gists (छोटे कोड स्निपेट्स) बनाने और एडिट करने की अनुमति।',
      en: 'Allows creating and editing Gists (small code snippets).'
    },
    requiredFor: ['Creating gists via MGit'],
    recommended: false
  },
  {
    id: 'user',
    name: 'user',
    description: {
      hi: 'आपके प्रोफ़ाइल डेटा को रीड/राइट करने की अनुमति।',
      en: 'Allows reading and writing your user profile data.'
    },
    requiredFor: ['Identity verification'],
    recommended: false
  }
];

export const BEST_PRACTICES_DATA: BestPractice[] = [
  {
    id: 'bp-1',
    emoji: '📛',
    title: {
      hi: 'हमेशा .gitignore का इस्तेमाल करें',
      en: 'Always use a .gitignore file'
    },
    description: {
      hi: 'node_modules, build फोल्डर्स, .env फाइल्स और अन्य संवेदनशील डेटा को कभी भी Git में कमिट न करें।',
      en: 'Never commit node_modules, build folders, .env files or other sensitive data into Git.'
    },
    tips: [
      'MGit में नई फाइल बनाकर .gitignore नाम रखें',
      'अंदर लिखें: node_modules/, *.log, .env, build/, dist/',
      'फिर Stage और Commit करें'
    ],
    level: 'beginner'
  },
  {
    id: 'bp-2',
    emoji: '🔀',
    title: {
      hi: 'Branching Strategy अपनाएँ',
      en: 'Adopt Branching Strategy'
    },
    description: {
      hi: 'मेन ब्रांच (main) को हमेशा प्रोडक्शन-रेडी रखें। हर नया फीचर अलग ब्रांच पर बनाएँ।',
      en: 'Keep the main branch always production-ready. Create a new branch for every new feature.'
    },
    tips: [
      'MGit में ☰ → "Branch" → "Create new branch" चुनें',
      'नाम रखें: feature/login-screen या bugfix/navbar',
      'काम पूरा होने पर Pull Request बनाएँ'
    ],
    level: 'intermediate'
  },
  {
    id: 'bp-3',
    emoji: '🔄',
    title: {
      hi: 'Merge Conflicts को सही तरीके से सुलझाएँ',
      en: 'Resolve Merge Conflicts Properly'
    },
    description: {
      hi: 'कॉन्फ्लिक्ट होने पर MGit आपको प्रभावित फाइलें दिखाएगा। कोड एडिटर में खोलकर <<< और >>> के बीच सही कोड रखें।',
      en: 'When a conflict occurs, MGit highlights the affected files. Open them in your editor and keep the correct code between the conflict markers.'
    },
    tips: [
      'कॉन्फ्लिक्ट वाली फाइल को Acode या Spck Editor में खोलें',
      'सभी conflict markers (<<<<<<<, =======, >>>>>>>) हटाएँ',
      'फाइल सेव करके फिर Stage + Commit करें'
    ],
    level: 'advanced'
  },
  {
    id: 'bp-4',
    emoji: '📝',
    title: {
      hi: 'अच्छे Commit Messages लिखें',
      en: 'Write meaningful Commit Messages'
    },
    description: {
      hi: 'Commit messages स्पष्ट, क्रियात्मक और संक्षिप्त होने चाहिए। "Fixed bug" की बजाय "Fixed login validation on Android 14" लिखें।',
      en: 'Commit messages should be clear, actionable and concise. Write "Fixed login validation on Android 14" instead of just "Fixed bug".'
    },
    tips: [
      'प्रेजेंट टेंस का इस्तेमाल करें (Add, Fix, Update)',
      '50 अक्षरों से कम रखें',
      'क्या बदला है और क्यों बदला, दोनों बताएँ'
    ],
    level: 'beginner'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    role: {
      hi: 'Android Developer @ Paytm',
      en: 'Android Developer @ Paytm'
    },
    quote: {
      hi: 'MGit ने मुझे ट्रेन में बैठे-बैठे पूरा प्रोजेक्ट GitHub पर पुश करने में मदद की। PAT बनाने के बाद सब आसान हो गया। अब मैं कहीं भी कोडिंग कर सकती हूँ।',
      en: 'MGit allowed me to push my entire project to GitHub while sitting in the train. After creating the PAT, everything became seamless. I can now code from anywhere.'
    },
    avatarEmoji: '👩‍💻',
    achievement: '15+ repositories managed from phone'
  },
  {
    id: 't2',
    name: 'Rahul Verma',
    role: {
      hi: 'Freelance Full-Stack Developer',
      en: 'Freelance Full-Stack Developer'
    },
    quote: {
      hi: 'पहले मुझे हर बार लैपटॉप उठाना पड़ता था। अब MGit + Acode के साथ मैं अपने फोन पर पूरा SaaS प्रोजेक्ट बना और GitHub पर डिप्लॉय कर देता हूँ।',
      en: 'I used to have to pick up my laptop every time. Now with MGit + Acode I can build and deploy complete SaaS projects directly from my phone.'
    },
    avatarEmoji: '🧔‍♂️',
    achievement: 'Built 4 client projects from phone only'
  },
  {
    id: 't3',
    name: 'Anjali Patel',
    role: {
      hi: 'CS Student, IIT Bombay',
      en: 'CS Student, IIT Bombay'
    },
    quote: {
      hi: 'कॉलेज के असाइनमेंट्स के लिए GitHub पर कोड सबमिट करने में बहुत आसानी हुई। प्रोफेसर को भी हैरानी हुई कि मैंने सब मोबाइल से किया।',
      en: 'Submitting assignments on GitHub became incredibly easy. Even my professor was surprised that I did everything from my mobile phone.'
    },
    avatarEmoji: '🎓',
    achievement: 'Scored 98% in Git & DevOps course'
  }
];
