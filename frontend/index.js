async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY 2023`



  try {
let selectedCard = null




    // getting the learners for cards
    let url = `http://localhost:3003/api/learners`
    let urlM = `http://localhost:3003/api/mentors`

    const res = await axios.get(url)

    const resM = await axios.get(urlM)

    document.querySelector('.info').textContent = 'No learner is selected'

    //making the div for cards
    // let currentCard = null

    function cardMaker(id, fullName, email, mentors) {
      const cards = document.querySelector('.cards')
      //card
      const card = document.createElement('div')
      card.classList.add('card')
      //name
      const h3Name = document.createElement('h3')
      h3Name.textContent = fullName
      card.appendChild(h3Name)

      //mail
      const divMail = document.createElement('div')
      divMail.textContent = email
      card.appendChild(divMail)
      //h4
      const h4closed = document.createElement("h4")

      h4closed.classList.add('closed')
      h4closed.textContent = 'Mentors'

      h4closed.addEventListener('click', (event) => {
        event.stopPropagation()
        h4closed.classList.toggle('closed')
        h4closed.classList.toggle('open')
      })
      card.appendChild(h4closed)
      //ul mentor
      const ulmentor = document.createElement('ul')

      //new
      mentors.forEach((mentorId) => {
        const mentor = resM.data.find((m) => m.id === mentorId)
        if (mentor) {
          const li = document.createElement('li')
          li.textContent = `${mentor.firstName} ${mentor.lastName}`
          ulmentor.appendChild(li)
        }
      })

      // const li1 = document.createElement('li')
      // li1.textContent = `${mentors[0]}`
      // ulmentor.appendChild(li1)

      // const li2 = document.createElement('li')
      // li2.textContent = `${mentors[1]}`
      // ulmentor.appendChild(li2)

      card.appendChild(ulmentor)

      cards.appendChild(card)




      card.addEventListener('click', () => {

        //new
        if (selectedCard && selectedCard !== card) {
          selectedCard.classList.remove('selected')
        }

        card.classList.toggle('selected')

        if (card.classList.contains('selected')) {
          h3Name.textContent = `${fullName}, ID ${id}`
        } else {
          h3Name.textContent = fullName
        }

        document.querySelector('.info').textContent = card.classList.contains('selected')
        ? `The selected learner is ${fullName}`
        : 'No learner is selected'

selectedCard = card

      })
      return card
    }





    res.data.forEach(learner => {
      cardMaker(learner.id, learner.fullName, learner.email, learner.mentors)
    });






  } catch (error) {
    console.error(error)
  }




















  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
