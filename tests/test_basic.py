import requests
import unittest

class TestColdXRAG(unittest.TestCase):
    def test_server_health(self):
        response = requests.get("http://localhost:5002/api/health")
        self.assertEqual(response.status_code, 200)
        
    def test_domains_count(self):
        response = requests.get("http://localhost:5002/api/domains")
        data = response.json()
        self.assertGreaterEqual(len(data['domains']), 8)
        
if __name__ == '__main__':
    unittest.main()
