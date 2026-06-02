import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { login, logout, getUserInfo, updateUserInfo, getUserList, deleteUser } from '../user'
import * as request from '../../utils/request'

vi.mock('../../utils/request', () => ({
  get: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
  post: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
  put: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
  del: vi.fn<(...args: unknown[]) => Promise<unknown>>(),
}))

describe('user API', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('login', () => {
    it('should login successfully and return token and user info', async () => {
      const mockResponse = {
        token: 'mock-token-123',
        user: {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          nickname: 'Test User',
          avatar: 'avatar.png',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      }

      vi.mocked(request.post).mockResolvedValue(mockResponse)

      const result = await login({
        username: 'testuser',
        password: 'password123',
      })

      expect(request.post).toHaveBeenCalledWith('/auth/login', {
        username: 'testuser',
        password: 'password123',
      })
      expect(result).toEqual(mockResponse)
    })

    it('should pass login params correctly', async () => {
      const mockResponse = {
        token: 'mock-token-456',
        user: {
          id: 2,
          username: 'admin',
          email: 'admin@example.com',
          nickname: 'Admin',
          avatar: 'admin.png',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
      }

      vi.mocked(request.post).mockResolvedValue(mockResponse)

      const params = {
        username: 'admin',
        password: 'admin123',
      }

      await login(params)

      expect(request.post).toHaveBeenCalledWith('/auth/login', params)
    })
  })

  describe('logout', () => {
    it('should logout successfully', async () => {
      vi.mocked(request.post).mockResolvedValue(undefined)

      await logout()

      expect(request.post).toHaveBeenCalledWith('/auth/logout')
    })
  })

  describe('getUserInfo', () => {
    it('should get user info successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        nickname: 'Test User',
        avatar: 'avatar.png',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }

      vi.mocked(request.get).mockResolvedValue(mockUser)

      const result = await getUserInfo()

      expect(request.get).toHaveBeenCalledWith('/user/info')
      expect(result).toEqual(mockUser)
    })
  })

  describe('updateUserInfo', () => {
    it('should update user info successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        nickname: 'Updated User',
        avatar: 'new-avatar.png',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      }

      vi.mocked(request.put).mockResolvedValue(mockUser)

      const updateData = {
        nickname: 'Updated User',
        avatar: 'new-avatar.png',
      }

      const result = await updateUserInfo(updateData)

      expect(request.put).toHaveBeenCalledWith('/user/info', updateData)
      expect(result).toEqual(mockUser)
    })

    it('should support partial update of user info', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        nickname: 'Test User',
        avatar: 'avatar.png',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }

      vi.mocked(request.put).mockResolvedValue(mockUser)

      const updateData = {
        nickname: 'New Nickname',
      }

      await updateUserInfo(updateData)

      expect(request.put).toHaveBeenCalledWith('/user/info', updateData)
    })
  })

  describe('getUserList', () => {
    it('should get user list successfully', async () => {
      const mockResponse = {
        list: [
          {
            id: 1,
            username: 'user1',
            email: 'user1@example.com',
            nickname: 'User 1',
            avatar: 'avatar1.png',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
          {
            id: 2,
            username: 'user2',
            email: 'user2@example.com',
            nickname: 'User 2',
            avatar: 'avatar2.png',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
          },
        ],
        total: 2,
      }

      vi.mocked(request.get).mockResolvedValue(mockResponse)

      const result = await getUserList(1, 10)

      expect(request.get).toHaveBeenCalledWith('/users', {
        page: 1,
        size: 10,
      })
      expect(result).toEqual(mockResponse)
    })

    it('should pass pagination params correctly', async () => {
      const mockResponse = {
        list: [],
        total: 0,
      }

      vi.mocked(request.get).mockResolvedValue(mockResponse)

      await getUserList(2, 20)

      expect(request.get).toHaveBeenCalledWith('/users', {
        page: 2,
        size: 20,
      })
    })
  })

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      vi.mocked(request.del).mockResolvedValue(undefined)

      await deleteUser(1)

      expect(request.del).toHaveBeenCalledWith('/users/1')
    })

    it('should pass user ID correctly', async () => {
      vi.mocked(request.del).mockResolvedValue(undefined)

      await deleteUser(123)

      expect(request.del).toHaveBeenCalledWith('/users/123')
    })
  })
})
