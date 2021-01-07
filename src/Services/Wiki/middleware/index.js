import make_API_call from "../../../providers/REST_API"
import {
  successMsg,
  errorMsg,
  waitingMsg,
  stopWaitMsg,
} from "../../../shared/SnackBars/index"
import validate from "../../../shared/validation"

export const voteForArticle = (articleId, type) => {
  return () => {
    waitingMsg(`Voting...`)
    make_API_call("put", `/wiki/voteForWikiArticle/${articleId}/${type}`, {})
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        //successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const followOrUnfollow = (articleId, type) => {
  return () => {
    waitingMsg(`${validate.nameFormatterToUpperCase(type)}ing...`)
    make_API_call(
      "put",
      `/wiki/followOrunFollowArticle/${articleId}/${type}`,
      {}
    )
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const newComment = (payload, articleId, callback) => {
  return () => {
    //waitingMsg("Crea the article...")
    make_API_call("post", `/wiki/newcomment/${articleId}`, payload)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
        callback()
      })
      .catch((err) => {
        stopWaitMsg()
        callback()
        errorMsg(err.message)
      })
  }
}

export const updateComment = (payload, articleId, commentId, callback) => {
  waitingMsg("Updating the comment...")
  return () => {
    make_API_call(
      "put",
      `/wiki/updatecomment/${articleId}/${commentId}`,
      payload
    )
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
        callback()
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
        callback()
      })
  }
}

export const deleteComment = (articleId, commentId, callback) => {
  waitingMsg("Deleting the comment...")
  return () => {
    make_API_call("delete", `/wiki/deletecomment/${articleId}/${commentId}`)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
        callback()
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
        callback()
      })
  }
}

export const restoreArticle = (articleId, categoryId) => {
  return () => {
    waitingMsg("Restoring the article...")
    make_API_call("put", `/wiki/restorearticle/${articleId}/${categoryId}`)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const revertArticle = (payload, articleId, categoryId) => {
  return () => {
    waitingMsg("Reverting the article...")
    make_API_call(
      "put",
      `/wiki/updatearticle/${articleId}/${categoryId}`,
      payload
    )
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const deleteArticle = (articleId) => {
  return () => {
    waitingMsg("Deleting the article...")
    make_API_call("delete", `/wiki/deletearticle/${articleId}`)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const updateArticle = (payload, articleId, categoryId) => {
  return () => {
    waitingMsg("Updating the article...")
    make_API_call(
      "put",
      `/wiki/updatearticle/${articleId}/${categoryId}`,
      payload
    )
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const addNewArticle = (payload, categoryId) => {
  return () => {
    waitingMsg("Creating the article...")
    make_API_call("post", `/wiki/newarticle/${categoryId}`, payload)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const addNewCategory = (payload, resolve, reject) => {
  return () => {
    waitingMsg("Creating the category...")
    make_API_call("post", `/wiki/newCategory`, payload)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const updateCategory = (payload, categoryId) => {
  return () => {
    waitingMsg("Updating the category...")
    make_API_call("put", `/wiki/updateCategory/${categoryId}`, payload)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const deleteCategory = (categoryId) => {
  return () => {
    waitingMsg("Deleting the catgory...")
    make_API_call("delete", `/wiki/deleteCategory/${categoryId}`)
      .then((data) => {
        console.log(data)
        stopWaitMsg()
        successMsg(data.message)
      })
      .catch((err) => {
        stopWaitMsg()
        errorMsg(err.message)
      })
  }
}

export const getPreDefinedArticles = (categoryMetaInfo) => {
  return async (dispatch, getState, { getFirebase }) => {
    console.log("getting articles")
    const firebase = getFirebase()
    const predefinedCategoryNames = ["General", "Knowledge"]
    const predefinedCategoryIds = []

    if (Object.keys(categoryMetaInfo).length) {
      Object.entries(categoryMetaInfo.types).forEach(([key, value]) => {
        if (predefinedCategoryNames.includes(value)) {
          predefinedCategoryIds.push(key)
        }
      })
    }

    const promises = []
    predefinedCategoryIds.forEach((id) => {
      const promise = firebase
        .firestore()
        .collectionGroup("ARTICLES_DOCS")
        .where("categoryId", "==", id)
        .where("isExist", "==", true)
        .orderBy("createdAt", "desc")
        .limit(5)
        .get()
      promises.push(promise)
    })

    const finalPromise = Promise.all(promises)
    return finalPromise
      .then((item) => {
        const articles = []
        item.forEach((snap) => {
          articles.push(...snap.docs.map((doc) => doc.data()))
        })
        console.log(articles)
      })
      .catch((err) => err)
  }
}
