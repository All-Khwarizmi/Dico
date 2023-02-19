# Dico 

## 1. What is Dico?

First of all, you there you have Dico's [repo](https://github.com/All-Khwarizmi/Dico) and [site](https://dico-ochre.vercel.app).

Then, as you might have guessed Dico is a simple French-Spanish dictionary. 

Dico allows you to look-up one word at the time in either directions thanks to [PONS Online Dictionary API](https://fr.pons.com/p/dictionnaire-en-ligne/developers/api), for which you will need an API key but their free tier is plenty enough for playing around.

For this project I've used :

- [Typescript](https://www.typescriptlang.org) for the safety reasons 
- [Next.js](https://nextjs.org) for both front-end and back-end
- a postgresql database hosted on [Railway.app](https://railway.app)
- [Prisma](https://www.prisma.io) as ORM 
- [Tailwindcss](https://tailwindcss.com) for the styling


## 2. Dico's purpose

As a Spanish teacher my biggest challenge is to make students do their homework. Then the second one is to make them not to write everything in French on an online translator, but rather use it wisely when they need it most.

However, what I've learned so far is that although they're supposedly digital natives, they don't know how to use such tool efficiently. It's like having a car but don't  knowing how to drive properly.

So I've implemented Dico in a course where they could look-up a certain amount of words to accomplish a series of tasks. The less the use it the more points they get. It forces them to try to guess or realise they might not need this word specifically for the understanding of the document. 

## 3. Big Theta of Dico

Since I'm a "free-tier developer" I promptly realised that even though it's not likely that my students use Dico enough to reach the API usage limit (1000 words), it might happen. 

Furthermore, I also realised that Dico's algorithm cost could be exponential if each student look for any given word. Not performant at all. 

## 4. Big O of Dico 

The solution I found is somewhat based on linguistics and a cost-sharing strategy. 

I know for a fact that we as speakers tend to use less and less vocabulary nowadays. So I thought that if I could store each word the first time it's been searched it would make the algorithm cost linear instead of exponential. It would make exceeding API limit less likely since we use to have around 25000 (on average) words of vocabulary. Finally, it might improve searching performance. Once a word has been searched and stored on a database, it can be accessed quicker than requesting it to the API.
 
## 5. Conclusion

All in all Dico is a dictionary web app that despite its simplicity could have been really expensive if I would not have come with an optimization of some sort. It's kind a taste of my own medicine that I had to work around this limitation by avoiding requesting too much the dictionary API.
