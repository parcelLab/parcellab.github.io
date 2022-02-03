async function getOpenJobs() {
  const url = 'https://api.lever.co/v0/postings/parcellab?mode=json&team=Engineering'

  const res = await fetch(url)
  const data = await res.json()
  return data
}

function createJobBlock(jobPosting) {
  const imageSrcList = {
    frontend: './static/img/unspl/undraw_Design_feedback_re_8gtk.png',
    backend: './static/img/unspl/undraw_hacker_mind_6y85.png',
    'full stack': './static/img/unspl/undraw_developer_activity_bv83.png',
    data: './static/img/unspl/undraw_Data_trends_re_2cdy.png',
    fallback: './static/img/unspl/undraw_Developer_activity_re_39tg.png'
  }

  let selectedImage = imageSrcList.fallback
  try {
    const selectedImgKey = Object.keys(imageSrcList).find(key => jobPosting.text.toLowerCase().includes(key))
    if (selectedImgKey) selectedImage = imageSrcList[selectedImgKey]
  } catch (err) { console.log(err) }

  return `
  <a class="posts-01__item" href="${jobPosting.hostedUrl}" target="_blank">
    <div class="posts-01__img_box">
      <img src="${selectedImage}" class="posts-01__img">

      <div class="posts-01__text">
        <h3 class="posts-01__title">${jobPosting.text}</h3>
        <div class="posts-01__info">${jobPosting.categories.location}</div>
        <div class="posts-01__info">${jobPosting.categories.commitment}</div>
      </div>
    </div>
  </a>
  `
}

function buildJobBlocks(openJobs) {
  if (Array.isArray(openJobs)) {
    return openJobs.map(createJobBlock)
  }
  return `
    <h3>😮‍💨 No matching Jobs found...</h3>
  `
}

async function main() {
  document.querySelector('.posts-01__wrapper').innerHTML = '🤖 Loading... Give me a second... Sometimes I am slow...'
  const openJobs = await getOpenJobs()
  console.log(openJobs)
  const jobsHtml = buildJobBlocks(openJobs)
  document.querySelector('.posts-01__wrapper').innerHTML = jobsHtml
}

main()
