/// this will work if crashed using test



// import { endpoints } from '../../../services/endpoints'

// export const calculateShares = async (data) => {
//   const response = await endpoints.calculateShares(data)
//   return response.data
// }

// export const calculateTax = async (data) => {
//   const response = await endpoints.calculateTax(data)
//   return response.data
// }

// export const detectDisputes = async (flags) => {
//   const response = await endpoints.detectDisputes(flags)
//   return response.data
// }

// export const generateShareCertificate = async (data) => {
//   const response = await endpoints.generateShareCertificate(data)
//   return response.data
// }




// import { endpoints } from '../../../services/endpoints'

// export const calculateShares = async (data) => {
//   const response = await endpoints.calculateShares(data)
//   return response.data
// }

// export const parseNLP = async (text) => {
//   const response = await endpoints.parseNLP(text)
//   return response.data
// }

// export const detectDisputes = async (flags) => {
//   const response = await endpoints.detectDisputes(flags)
//   return response.data
// }

// export const calculateTax = async (data) => {
//   const response = await endpoints.calculateTax(data)
//   return response.data
// }

// export const getProcessSteps = async (hasMinor, hasDispute, isSelling) => {
//   const response = await endpoints.getProcessSteps(hasMinor, hasDispute, isSelling)
//   return response.data
// }

// export const generateShareCertificate = async (data) => {
//   const response = await endpoints.generateShareCertificate(data)
//   return response.data
// }



// import { endpoints } from '../../../services/endpoints'

// export const calculateShares = async (data) => {
//   const response = await endpoints.calculateShares(data)
//   return response.data
// }

// export const parseNLP = async (text) => {
//   const response = await endpoints.parseNLP(text)
//   return response.data
// }

// export const detectDisputes = async (flags) => {
//   const response = await endpoints.detectDisputes(flags)
//   return response.data
// }

// export const calculateTax = async (data) => {
//   const response = await endpoints.calculateTax(data)
//   return response.data
// }

// export const getProcessSteps = async (hasMinor, hasDispute, isSelling) => {
//   const response = await endpoints.getProcessSteps(hasMinor, hasDispute, isSelling)
//   return response.data
// }

// export const generateShareCertificate = async (data) => {
//   const response = await endpoints.generateShareCertificate(data)
//   return response.data
// }



//
// test version
//
import { endpoints } from '../../../services/endpoints'

export const calculateShares = async (data) => {
  const response = await endpoints.calculateShares(data)
  // Return the full response (not just response.data)
  return response.data
}

export const parseNLP = async (text) => {
  const response = await endpoints.parseNLP(text)
  return response.data
}

export const detectDisputes = async (flags) => {
  const response = await endpoints.detectDisputes(flags)
  // Return the data object directly
  return response.data
}

export const calculateTax = async (data) => {
  const response = await endpoints.calculateTax(data)
  // Return the data object (not response.data.data)
  return response.data
}

export const getProcessSteps = async (hasMinor, hasDispute, isSelling) => {
  const response = await endpoints.getProcessSteps(hasMinor, hasDispute, isSelling)
  return response.data
}

export const generateShareCertificate = async (data) => {
  const response = await endpoints.generateShareCertificate(data)
  return response.data
}














import { endpoints } from '../../../services/endpoints'

export const calculateShares = async (data) => {
  try {
    const response = await endpoints.calculateShares(data)
    console.log('calculateShares raw response:', response)
    
    // Handle different response structures
    if (response.data?.data?.shares) {
      return response.data.data
    } else if (response.data?.shares) {
      return response.data
    } else if (response.shares) {
      return response
    }
    return response.data || response
  } catch (error) {
    console.error('calculateShares error:', error)
    throw error
  }
}

export const parseNLP = async (text) => {
  try {
    const response = await endpoints.parseNLP(text)
    console.log('parseNLP raw response:', response)
    
    if (response.data?.data?.normalized) {
      return response.data.data
    } else if (response.data?.normalized) {
      return response.data
    } else if (response.normalized) {
      return response
    }
    return response.data || response
  } catch (error) {
    console.error('parseNLP error:', error)
    throw error
  }
}

export const detectDisputes = async (flags) => {
  try {
    const response = await endpoints.detectDisputes(flags)
    console.log('detectDisputes raw response:', response)
    
    if (response.data?.data?.disputes) {
      return response.data.data
    } else if (response.data?.disputes) {
      return response.data
    } else if (response.disputes) {
      return response
    }
    return response.data || response
  } catch (error) {
    console.error('detectDisputes error:', error)
    throw error
  }
}

export const calculateTax = async (data) => {
  try {
    const response = await endpoints.calculateTax(data)
    console.log('calculateTax raw response:', response)
    
    // Tax response might be directly the tax data
    if (response.data?.data?.heirs_shares) {
      return response.data.data.heirs_shares
    } else if (response.data?.heirs_shares) {
      return response.data.heirs_shares
    } else if (response.heirs_shares) {
      return response.heirs_shares
    } else if (response.data && typeof response.data === 'object') {
      // If response.data is already the tax object
      return response.data
    }
    return response.data || response
  } catch (error) {
    console.error('calculateTax error:', error)
    throw error
  }
}

export const getProcessSteps = async (hasMinor, hasDispute, isSelling) => {
  try {
    const response = await endpoints.getProcessSteps(hasMinor, hasDispute, isSelling)
    console.log('getProcessSteps raw response:', response)
    
    if (response.data?.data?.steps) {
      return response.data.data.steps
    } else if (response.data?.steps) {
      return response.data.steps
    } else if (response.steps) {
      return response.steps
    } else if (Array.isArray(response.data)) {
      return response.data
    } else if (Array.isArray(response)) {
      return response
    }
    return response.data || response
  } catch (error) {
    console.error('getProcessSteps error:', error)
    throw error
  }
}

export const generateShareCertificate = async (data) => {
  try {
    const response = await endpoints.generateShareCertificate(data)
    return response.data // This should be a blob
  } catch (error) {
    console.error('generateShareCertificate error:', error)
    throw error
  }
}